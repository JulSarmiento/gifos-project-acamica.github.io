const apiKey = "JIHSsndx8l537Iawj5yP5zdHAEhDv4Yw";

let screenFavorites = document.getElementById("favorites-results");

let favoritesArray = [];
let favoritesString = localStorage.getItem("gifosFavorites");

let modalMobileFav = document.createElement("div");
let modalDesktopFav = document.createElement("div");

let urlActual = window.location.pathname;

searchFavorites();

function searchFavorites() {
  let screenFavoritesEmpty = document.getElementById("favorites-empty");

  if (favoritesString == null || favoritesString == "[]") {
    screenFavoritesEmpty.style.display = "block";
    screenFavorites.style.display = "none";
  } else {
    favoritesArray = JSON.parse(favoritesString);
    let urlfavorites = `https://api.giphy.com/v1/gifs?ids=${favoritesArray.toString()}&api_key=${apiKey}`;

    fetch(urlfavorites)
      .then((response) => response.json())
      .then((content) => {
        showFavorites(content);
      })
      .catch((err) => {
        console.error("fetch favoritos fallo", err);
      });
  }
}

function showFavorites(content) {
  let gifosFavoritesArray = content.data;

  for (let i = 0; i < gifosFavoritesArray.length; i++) {
    screenFavorites.innerHTML += `
    <div class="results-gif-box-fav" onclick="maxGifMobileFav('${content.data[i].images.downsized.url}', '${content.data[i].id}', '${content.data[i].slug}', '${content.data[i].username}', '${content.data[i].title}')">
    <div class="gif-actions-results-fav">
      <div class="icons-actions-gif">
        <button class="icons-actions-box favorite-fav" onclick="deleteFav('${content.data[i].id}')">
          <img src="./assets/icon-fav-active.svg" alt="icon-favorite" id="icon-delete-fav-${content.data[i].id}">
        </button>
        <button class="icons-actions-box download" onclick="downloadGif('${content.data[i].images.downsized.url}', '${content.data[i].slug}')">
          <img src="./assets/icon-download.svg" alt="icon-dowlnoad">
        </button>
        <button class="icons-actions-box max" onclick="maxGifDesktopFav('${content.data[i].images.downsized.url}', '${content.data[i].id}', '${content.data[i].slug}', '${content.data[i].username}', '${content.data[i].title}')">
          <img src="./assets/icon-max.svg" alt="icon-max">
        </button>
      </div>
      <div class="texts-descripcion-gif-favorites">
        <p class="user-gif-favorites">${content.data[i].username}</p>
        <p class="tittle-gif-favorites">${content.data[i].title}</p>
      </div>
    </div>
    <img src="${content.data[i].images.downsized.url}" alt="${content.data[i].title}" class="results-gif">
  </div>
      `;
  }
}

function deleteFav(gif) {
  let arrayAux = [];
  arrayAux = JSON.parse(favoritesString);
  let indice = arrayAux.indexOf(gif);

  arrayAux.splice(indice, 1);

  let newFavoritesString = JSON.stringify(arrayAux);
  localStorage.setItem("gifosFavorites", newFavoritesString);

  let iconFavdelete = document.getElementById("icon-delete-fav-" + gif);
  iconFavdelete.setAttribute("src", "./assets/icon-fav-hover.svg");

  location.reload();
}

async function downloadGif(gifImg, gifName) {
  let blob = await fetch(gifImg).then((img) => img.blob());
  invokeSaveAsDialog(blob, gifName + ".gif");
}

function maxGifMobileFav(img, id, slug, user, title) {
  if (window.matchMedia("(max-width: 1023px)").matches) {
    modalMobileFav.style.display = "block";
    modalMobileFav.innerHTML = `
  <button class="modal-btn-close" onclick="closeModalMobileFav()"><img src="./assets/button-close.svg" alt=""></button>
  <img src="${img}" alt="${id}" class="modal-gif">

  <div class="modal-bar">
    <div class="modal-texts">
      <p class="modal-user">${user}</p>
      <p class="modal-tittle">${title}</p>
    </div>
    <div>
      <button class="modal-btn" onclick="deleteFavMaxMob('${id}')"><img src="./assets/icon-fav-active.svg" alt="fav-gif" id="icon-delete-fav-max-mobile-${id}"></button>
      <button class="modal-btn" onclick="downloadGif('${img}', '${slug}')"><img src="./assets/icon-download.svg" alt="download-gif"></button>
    </div>
  </div>
  `;
    modalMobileFav.classList.add("modal-activated");
    document.body.appendChild(modalMobileFav);
  }
}

function closeModalMobileFav() {
  modalMobileFav.style.display = "none";
}

function deleteFavMaxMob(gif) {
  let iconNoFavMaxMob = document.getElementById(
    "icon-delete-fav-max-mobile-" + gif
  );
  iconNoFavMaxMob.setAttribute("src", "./assets/icon-fav-hover.svg");
  deleteFav(gif);
}

function maxGifDesktopFav(img, id, slug, user, title) {
  if (window.matchMedia("(min-width: 1023px)").matches) {
    modalDesktopFav.style.display = "block";
    modalDesktopFav.innerHTML = `
  <button class="modal-btn-close" onclick="closeModalDesktopFav()"><img src="./assets/button-close.svg" alt=""></button>
  <img src="${img}" alt="${id}" class="modal-gif">

  <div class="modal-bar">
    <div class="modal-texts">
      <p class="modal-user">${user}</p>
      <p class="modal-tittle">${title}</p>
    </div>
    <div>
      <button class="modal-btn" onclick="deleteFavMax('${id}')"><img src="./assets/icon-fav-active.svg" alt="fav-gif" id="icon-delete-fav-max-${id}"></button>
      <button class="modal-btn" onclick="downloadGif('${img}', '${slug}')"><img src="./assets/icon-download.svg" alt="download-gif"></button>
    </div>
  </div>
  `;
    modalDesktopFav.classList.add("modal-activated");
    document.body.appendChild(modalDesktopFav);
  }
}

function closeModalDesktopFav() {
  modalDesktopFav.style.display = "none";
}

function deleteFavMax(gif) {
  let iconNoFavMax = document.getElementById("icon-delete-fav-max-" + gif);
  iconNoFavMax.setAttribute("src", "./assets/icon-fav-hover.svg");
  deleteFav(gif);
}
