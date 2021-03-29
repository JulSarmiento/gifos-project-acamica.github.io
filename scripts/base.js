const API_KEY = "JIHSsndx8l537Iawj5yP5zdHAEhDv4Yw";

/**
 * Get favorites from localstorage as array
 *
 * @returns {Array} Favorites
 */
function getFavorites() {
  return JSON.parse(localStorage.getItem("gifosFavorites") || "[]");
}

function isFavorite(id) {
  const favorites = getFavorites();

  return favorites.includes(id);
}

function handleFav(id) {
  const favorites = getFavorites();
  const icon = document.getElementById("icon-delete-fav-" + id);

  const index = favorites.indexOf(id)

  if (index !== -1) {
    icon.setAttribute("src", "./assets/icon-fav-hover.svg");
    favorites.splice(index, 1);
  } else {
    icon.setAttribute("src", "./assets/icon-fav-active.svg");
    favorites.push(id);
  }

  localStorage.setItem('gifosFavorites', JSON.stringify(favorites));
  location.reload();
}

/**
 * Maximize card
 * 
 * @param {string} img - Modal img src 
 * @param {string} id - Element unique id
 * @param {string} slug - Card Slug name
 * @param {string} user - Card author
 * @param {string} title - Modal title
 */
function maximizeCard(img, id, slug, user, title) {
  const modal = document.getElementById('modal');
  modal.style.display = "block";
  modal.innerHTML = `
    <button class="modal-btn-close" onclick="closeModal()"><img src="./assets/button-close.svg" alt=""></button>
    <img src="${img}" alt="${id}" class="modal-gif">
    <div class="modal-bar">
      <div class="modal-texts">
        <p class="modal-user">${user}</p>
        <p class="modal-tittle">${title}</p>
      </div>
      <div>
        <button class="modal-btn" onclick="handleFav('${id}')">
          <img src="./assets/icon-fav-${isFavorite(id) ? 'active': 'hover'}.svg" alt="fav-gif" id="icon-delete-fav-max-${id}">
        </button>
        <button class="modal-btn" onclick="downloadGif('${img}', '${slug}')"><img src="./assets/icon-download.svg" alt="download-gif"></button>
      </div>
    </div>
  `;
  modal.classList.add("modal-activated");
}

function closeModal() {
  modal = document.getElementById('modal');
  modal.style.display = "none";
  modal.innerHTML = '';
}

async function downloadGif(gifImg, gifName) {
  let blob = await fetch(gifImg).then((img) => img.blob());
  invokeSaveAsDialog(blob, gifName + ".gif");
}

/**
 * Parse Gif as card
 *
 * @param {object} card - Card object
 * @param {id} card.id - Gif unique ID
 * @param {Object} card.images - Card images objcet
 * @param {Object} card.images.downsized - Card image small siszed
 * @param {string} card.images.downsized.url - Card image type url
 * @param {string} card.slug - Gif slug name
 * @param {string} card.title - Gif name
 * @param {string} card.username - Gif author
 * @returns {string} HtmlCardElement
 */
function printCard({ id, images, username, title, slug }) {
  // const favorites = getFavorites();
  // addFavoriteTrending('${id}')
  // deleteFav('${id}')
  const onclickMobile = `onclick="maximizeCard('${images.downsized.url}', '${id}', '${slug}', '${username}', '${title}')`;

  return `
        <div class="results-gif-box-fav" ${ window.matchMedia("(max-width: 1023px)").matches ? onclickMobile : ''}">
          <div class="gif-actions-results-fav">
          <div class="icons-actions-gif">
              <button class="icons-actions-box favorite-fav" onclick="handleFav('${id}')">
                  <img src="./assets/icon-fav-${isFavorite(id) ? 'active': 'hover'}.svg" alt="icon-favorite" id="icon-delete-fav-${id}">
              </button>
              <button class="icons-actions-box download" onclick="downloadGif('${images.downsized.url}', '${slug}')">
                  <img src="./assets/icon-download.svg" alt="icon-dowlnoad">
              </button>
              <button class="icons-actions-box max" onclick="maximizeCard('${images.downsized.url}', '${id}', '${slug}', '${username}', '${title}')">
                  <img src="./assets/icon-max.svg" alt="icon-max">
              </button>
          </div>
          <div class="texts-descripcion-gif-favorites">
              <p class="user-gif-favorites">${username}</p>
              <p class="tittle-gif-favorites">${title}</p>
          </div>
        </div>
        <img src="${images.downsized.url}" alt="${title}" class="results-gif">
    </div>
    `;
}

window.addEventListener("load", () => {
  const modal = document.createElement("div");
  modal.setAttribute("id", "modal");
  document.body.appendChild(modal);
});
