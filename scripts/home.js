// Constants

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
      `https://api.giphy.com/v1/tags/related/${search}?api_key=${API_KEY}&limit=4`
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

function closeBoxSearch() {
  blockSearchh.classList.add("search");
  blockSearchh.classList.remove("search-active");
  iconSearch.style.display = "block";
  btnCloseSearch.style.display = "none";
}

btnShowMoreResults.addEventListener("click", () => {
  offsetSearch = offsetSearch + 12;
  searchGifos();
});

/**
 * Search gifos
 *
 * @param {Event} e - DOM Event
 */
function searchGifos() {
  let urlSearch = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&limit=12&offset=${offsetSearch}&q=`;
  let strSearch = inputSearch.value.trim();
  urlSearch = urlSearch.concat(strSearch);

  fetch(urlSearch)
    .then((response) => response.json())
    .then(({ data }) => {
      let containerResultsSearch = document.getElementById(
        "search-results-container"
      );
      containerResultsSearch.style.display = "block";

      let tittleSearch = document.getElementById("search-tittle");
      tittleSearch.innerHTML = inputSearch.value;

      if (!data || data.length == 0) {
        resultsSearchGIFOS.innerHTML = `
          <div class="search-error-container">
          <img src="./assets/icon-search-sin-resultado.svg" alt="search sin resultado" class="search-error-img">
          <h3 class="search-error-text">Intenta con otra búsqueda</h3>
          </div>
          `;
        btnShowMoreResults.style.display = "none";
      } else {
        let innerHTML = '';
        data.forEach( (data) => {
          innerHTML += printCard(data);
        } );

        resultsSearchGIFOS.innerHTML = innerHTML;
      }
    })
    .catch((error) => {
      console.log("error search ver mas" + error);
    });
}

window.addEventListener("load", () => {
  const trendingTopicsText = document.getElementById("trending-topics");

  const url = `https://api.giphy.com/v1/trending/searches?api_key=${API_KEY}`;

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