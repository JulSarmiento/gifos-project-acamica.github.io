// Constants

const apiKey = "JIHSsndx8l537Iawj5yP5zdHAEhDv4Yw";
const inputSearch = document.getElementById("input-search");
const blockSearchh = document.getElementById("search");
const iconSearch = document.getElementById("search-lupa");
const btnSearch = document.getElementById("search-glass-grey");
const btnCloseSearch = document.getElementById("close-search");
const listSuggestions = document.getElementById("search-suggestions");
const resultsSearchGIFOS = document.getElementById("search-results");
const btnShowMoreResults = document.getElementById("search-results-show-more");

// Variables
let offsetSearch = 0;
let search;
let modalMobile = document.createElement("div");
let modalDesktop = document.createElement("div");

inputSearch.addEventListener("keyup", () => {
  search = inputSearch.value;

  blockSearchh.classList.remove("search");
  blockSearchh.classList.add("search-active");
  iconSearch.style.display = "none";
  btnCloseSearch.style.display = "block";

  if (search.length >= 1) {
    fetch(
      `https://api.giphy.com/v1/tags/related/${search}?api_key=${apiKey}&limit=4`
    )
      .then((response) => response.json())
      .then((data) => {
        suggestionsData(data);
      })
      .catch((err) => {
        console.error("error al traer suggestions de search", err);
      });
  } else {
    closeBoxSearch();
  }
});

function suggestionsData(data) {
  let suggestion = data.data;
  listSuggestions.innerHTML = `
    <li class="suggestion">
      <img src="./assets/icon-search-gris.svg" alt="suggestion-glass-gris"
      class="suggestion-glass-gris">
      <p class="search-suggestion-text" >${suggestion[0].name}</p>
    </li>
    <li class="suggestion">
      <img src="./assets/icon-search-gris.svg" alt="suggestion-glass-gris"
      class="suggestion-glass-gris">
      <p class="search-suggestion-text" >${suggestion[1].name}</p>
    </li>
    <li class="suggestion">
      <img src="./assets/icon-search-gris.svg" alt="suggestion-glass-gris"
      class="suggestion-glass-gris">
      <p class="search-suggestion-text" >${suggestion[2].name}</p>
    </li>
    <li class="suggestion">
      <img src="./assets/icon-search-gris.svg" alt="suggestion-glass-gris"
      class="suggestion-glass-gris">
      <p class="search-suggestion-text" >${suggestion[3].name}</p>
    </li>`;
}

listSuggestions.addEventListener("click", function (li) {
  inputSearch.value = li.target.textContent;
  searchGifos();
});

btnCloseSearch.addEventListener("click", () => {
  inputSearch.value = "";
  inputSearch.placeholder = "Busca GIFOS y más";
  blockSearchh.classList.add("search");
  blockSearchh.classList.remove("search-active");
  iconSearch.style.display = "block";
  btnCloseSearch.style.display = "none";
});

btnSearch.addEventListener("click", searchGifos);

inputSearch.addEventListener("keyup", (e) => {
  if (e.defaultPrevented) {
    return; // Should do nothing if the default action has been cancelled
  }

  if (e.key === 13) {
    searchGifos();
  }
});

function searchGifos() {
  let urlSearch = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=12&offset=${offsetSearch}&q=`;
  let strSearch = inputSearch.value.trim();
  urlSearch = urlSearch.concat(strSearch);

  fetch(urlSearch)
    .then((response) => response.json())
    .then((content) => {
      resultsSearchGIFOS.innerHTML = "";
      let containerResultsSearch = document.getElementById(
        "search-results-container"
      );
      containerResultsSearch.style.display = "block";

      let tittleSearch = document.getElementById("search-tittle");
      tittleSearch.innerHTML = inputSearch.value;

      if (content.data == 0) {
        resultsSearchGIFOS.innerHTML = `
          <div class="search-error-container">
          <img src="./assets/icon-busqueda-sin-resultado.svg" alt="search sin resultado" class="search-error-img">
          <h3 class="search-error-text">Intenta con otra búsqueda</h3>
          </div>
          `;
        btnShowMoreResults.style.display = "none";
      } else {
        for (let i = 0; i < content.data.length; i++) {
          bringSearch(content.data[i]);
        }
      }
    })
    .catch((error) => {
      console.log("error search" + error);
    });

  closeBoxSearch();
}

function bringSearch(content) {
  resultsSearchGIFOS.innerHTML += `
      <div class="results-gif-box" onclick="maxGifMobile('${content.images.downsized.url}', '${content.id}', '${content.slug}', '${content.username}', '${content.title}')">
      <div class="gif-actions-results">
          <div class="icons-actions-gif">
              <button class="icons-actions-box favorite" onclick="addFavoriteSearch('${content.id}')">
                  <img src="./assets/icon-fav-hover.svg" alt="icon-favorite" id="icon-fav-${content.id}">
              </button>
              <button class="icons-actions-box download" onclick="downloadGif('${content.images.downsized.url}', '${content.slug}')">
                  <img src="./assets/icon-download.svg" alt="icon-dowlnoad">
              </button>
              <button class="icons-actions-box max" onclick="maxGifDesktop('${content.images.downsized.url}', '${content.id}', '${content.slug}', '${content.username}', '${content.title}')">
                  <img src="./assets/icon-max.svg" alt="icon-max">
              </button>
          </div>
          <div class="texts-descripcion-gif-results">
              <p class="user-gif-results">${content.username}</p>
              <p class="tittle-gif-results">${content.title}</p>
          </div>
      </div>
      <img src="${content.images.downsized.url}" alt="${content.id}" class="results-gif" >
    </div>
  `;
}

function closeBoxSearch() {
  blockSearchh.classList.add("search");
  blockSearchh.classList.remove("search-active");
  iconSearch.style.display = "block";
  btnCloseSearch.style.display = "none";
}

btnShowMoreResults.addEventListener("click", () => {
  offsetSearch = offsetSearch + 12;
  searchGifosShowMore();
});

/**
 * Search gifos
 *
 * @param {Event} e - DOM Event
 */
function searchGifosShowMore() {
  let urlSearch = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=12&offset=${offsetSearch}&q=`;
  let strSearch = inputSearch.value.trim();
  urlSearch = urlSearch.concat(strSearch);

  fetch(urlSearch)
    .then((response) => response.json())
    .then((content) => {
      let containerResultsSearch = document.getElementById(
        "search-results-container"
      );
      containerResultsSearch.style.display = "block";

      let tittleSearch = document.getElementById("search-tittle");
      tittleSearch.innerHTML = inputSearch.value;

      if (content.data == 0) {
        resultsSearchGIFOS.innerHTML = `
          <div class="search-error-container">
          <img src="./assets/icon-search-sin-resultado.svg" alt="search sin resultado" class="search-error-img">
          <h3 class="search-error-text">Intenta con otra búsqueda</h3>
          </div>
          `;
        btnShowMoreResults.style.display = "none";
      } else {
        for (let i = 0; i < content.data.length; i++) {
          bringSearch(content.data[i]);
        }
      }
    })
    .catch((error) => {
      console.log("error search ver mas" + error);
    });
}

window.addEventListener("load", async () => {
  const trendingTopicsText = document.getElementById("trending-topics");

  const url = `https://api.giphy.com/v1/trending/searches?api_key=${apiKey}`;

  return fetch(url)
    .then((resp) => resp.json())
    .then((content) => {
      let topics = content.data;
      trendingTopicsText.innerHTML = `<span class="trending-topics-link">${topics[0]}</span>, <span class="trending-topics-link">${topics[1]}</span>, <span class="trending-topics-link">${topics[2]}</span>, <span class="trending-topics-link">${topics[3]}</span>, <span class="trending-topics-link">${topics[4]}</span>`;

      let topicBtn = document.getElementsByClassName("trending-topics-link");
      for (let x = 0; x < topicBtn.length; x++) {
        topicBtn[x].addEventListener("click", function (e) {
          inputSearch.value = topics[x];
          searchGifos();
        });
      }
    })
    .catch((err) => {
      console.log("error trending topics" + err);
    });
});

/**
 *
 * @param {*} gif
 */
function addFavoriteSearch(gif) {
  let iconFav = document.getElementById("icon-fav-" + gif);
  iconFav.setAttribute("src", "./assets/icon-fav-active.svg");

  addFavorite(gif);
}

/**
 * Add gif to favorites
 *
 * @param {object} gif - Gif instance
 */
function addFavorite(gif) {
  if (favoritesString == null) {
    favoritesArray = [];
  } else {
    favoritesArray = JSON.parse(favoritesString);
  }

  favoritesArray.push(gif);
  favoritesString = JSON.stringify(favoritesArray);
  localStorage.setItem("gifosFavorites", favoritesString);
}

/**
 * Download Gif
 *
 * @async
 * @param {string} gifImg - Gif url to download
 * @param {string} gifName - Gif filename
 */
async function downloadGif(gifImg, gifName) {
  let blob = await fetch(gifImg).then((img) => img.blob());
  invokeSaveAsDialog(blob, gifName + ".gif");
}

/**
 * Set max display gif in grid
 *
 * @param {*} img
 * @param {*} id
 * @param {*} slug
 * @param {*} user
 * @param {*} title
 */
function maxGifMobile(img, id, slug, user, title) {
  if (window.matchMedia("(max-width: 1023px)").matches) {
    modalMobile.style.display = "block";
    modalMobile.innerHTML = `
  <button class="modal-btn-close" onclick="closeModalMobile()"><img src="./assets/button-close.svg" alt="close"></button>
  <img src="${img}" alt="${id}" class="modal-gif">

  <div class="modal-bar">
    <div class="modal-texts">
      <p class="modal-user">${user}</p>
      <p class="modal-tittle">${title}</p>
    </div>
    <div>
      <button class="modal-btn" onclick="addFavoriteMaxMobile('${id}')"><img src="./assets/icon-fav-hover.svg" alt="fav-gif" id="icon-fav-max-mob-${id}"></button>
      <button class="modal-btn" onclick="downloadGif('${img}', '${slug}')"><img src="./assets/icon-download.svg" alt="download-${slug}"></button>
    </div>
  </div>
  `;
    modalMobile.classList.add("modal-activated");
    document.body.appendChild(modalMobile);
  }
}

/**
 * Close modal on mobile
 */
function closeModalMobile() {
  modalMobile.style.display = "none";
}

/**
 * Add gif to favorites in mobile
 *
 * @param {string} gif - Gif name
 */
function addFavoriteMaxMobile(gif) {
  let iconFavMaxMobile = document.getElementById("icon-fav-max-mob-" + gif);
  iconFavMaxMobile.setAttribute("src", "./assets/icon-fav-active.svg");

  addFavorite(gif);
}

function maxGifDesktop(img, id, slug, user, title) {
  if (window.matchMedia("(min-width: 1023px)").matches) {
    modalDesktop.style.display = "block";
    modalDesktop.innerHTML = `
      <button class="modal-btn-close" onclick="closeModalDesktop()"><img src="./assets/button-close.svg" alt="close"></button>
      <img src="${img}" alt="${id}" class="modal-gif">

      <div class="modal-bar">
        <div class="modal-texts">
          <p class="modal-user">${user}</p>
          <p class="modal-tittle">${title}</p>
        </div>
        <div>
          <button class="modal-btn" onclick="addFavoriteMax('${id}')"><img src="./assets/icon-fav-hover.svg" alt="fav-gif" id="icon-fav-max-${id}"></button>
          <button class="modal-btn" onclick="downloadGif('${img}', '${slug}')"><img src="./assets/icon-download.svg" alt="download-${slug}"></button>
        </div>
      </div>
    `;
    modalDesktop.classList.add("modal-activated");
    document.body.appendChild(modalDesktop);
  }
}

function closeModalDesktop() {
  modalDesktop.style.display = "none";
}

function addFavoriteMax(gif) {
  let iconFavMax = document.getElementById("icon-fav-max-" + gif);
  iconFavMax.setAttribute("src", "./assets/icon-fav-active.svg");

  addFavorite(gif);
}
