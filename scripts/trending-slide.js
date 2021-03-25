
// TRENDING GIFOS
//1. Traigo el array con trending gifos
//2. reemplazo los gifos mostrados con el contenido del array

let sliderTrendingGifos = document.getElementById("trending-slider");
trendingGifos();

function trendingGifos() {
  let url = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=8`;

  fetch(url)
    .then((resp) => resp.json()) //me trae el json con los 4 trending gifos
    .then((content) => {
      //object with data, pagination, meta
      let trendingGifArray = content.data || [];

      let trendingGIFOhtml = "";

      trendingGifArray.forEach((trendingGif) => {
        trendingGIFOhtml += `
            <div class="gif-container" onclick="maxGifMobileTrending('${trendingGif.images.downsized.url}', '${trendingGif.id}', '${trendingGif.slug}', '${trendingGif.username}', '${trendingGif.title}')">
                    <div class="gif-actions">
                        <div class="icons-actions-gif">
                            <button class="icons-actions-box favorite" onclick="addFavoriteTrending('${trendingGif.id}')">
                                <img src="./assets/icon-fav-hover.svg" alt="icon-favorite" id="icon-fav-trending-${trendingGif.id}">
                            </button>
                            <button class="icons-actions-box download" onclick="downloadGifTrending('${trendingGif.images.downsized.url}', '${trendingGif.slug}')">
                                <img src="./assets/icon-download.svg" alt="icon-download">
                            </button>
                            <button class="icons-actions-box max" onclick="maxGifDesktopTrending('${trendingGif.images.downsized.url}', '${trendingGif.id}', '${trendingGif.slug}', '${trendingGif.username}', '${trendingGif.title}')">
                                <img src="./assets/icon-max.svg" alt="icon-max">
                            </button>
                        </div>
                        <div class="texts-descripcion-gif">
                            <p class="user-gif">${trendingGif.username}</p>
                            <p class="tittle-gif">${trendingGif.title}</p>
                        </div>
                    </div>
                    <img src="${trendingGif.images.downsized.url}" alt="${trendingGif.title}" class="trending-gif">
                </div>
            `;
      });

      sliderTrendingGifos.innerHTML = trendingGIFOhtml;
    })
    .catch((err) => {
      console.log(err);
    });
}

//funciones para slide desktop
//let numberOfImg = document.querySelectorAll('.gif-container').length;
let imageIndex = 1;
let translateX = 0;

let trendingBtnPrev = document.getElementById("trending-btn-previous");
let trendingBtnNext = document.getElementById("trending-btn-next");

trendingBtnNext.addEventListener("click", sliderNext);
function sliderNext() {
  if (window.matchMedia("(min-width: 1440px)").matches) {
    if (imageIndex <= 5) {
      imageIndex++;
      translateX -= 387;
      sliderTrendingGifos.style.transform = `translateX(${translateX}px)`;
    }
  } else if (window.matchMedia("(min-width: 1024px)").matches) {
    if (imageIndex <= 5) {
      imageIndex++;
      translateX -= 273;
      sliderTrendingGifos.style.transform = `translateX(${translateX}px)`;
    }
  }
}

trendingBtnPrev.addEventListener("click", sliderPrev);
function sliderPrev() {
  if (window.matchMedia("(min-width: 1440px)").matches) {
    if (imageIndex !== 1) {
      imageIndex--;
      translateX += 387;
      sliderTrendingGifos.style.transform = `translateX(${translateX}px)`;
    }
  } else if (window.matchMedia("(min-width: 1024px)").matches) {
    if (imageIndex !== 1) {
      imageIndex--;
      translateX += 273;
      sliderTrendingGifos.style.transform = `translateX(${translateX}px)`;
    }
  }
}

//actions TARJETAS
//MODAL MAX
modalMobile = document.createElement("div");
modalDesktop = document.createElement("div");

function maxGifMobileTrending(img, id, slug, user, title) {
  if (window.matchMedia("(max-width: 1023px)").matches) {
    modalMobile.style.display = "block";
    modalMobile.innerHTML = `
    <button class="modal-btn-close" onclick="closeModalMobile()"><img src="./assets/button-close.svg" alt=""></button>
    <img src="${img}" alt="${id}" class="modal-gif">

    <div class="modal-bar">
        <div class="modal-texts">
            <p class="modal-user">${user}</p>
            <p class="modal-tittle">${title}</p>
        </div>
        <div>
            <button class="modal-btn" onclick="addFavoriteMaxMobileTrending('${id}')"><img src="./assets/icon-fav-hover.svg" alt="fav-gif" id="icon-fav-max-mob-trending-${id}"></button>
            <button class="modal-btn" onclick="downloadGifTrending('${img}', '${slug}')"><img src="./assets/icon-download.svg" alt="download-gif"></button>
        </div>
    </div>
    `;
    modalMobile.classList.add("modal-activated");
    document.body.appendChild(modalMobile);
  }
}

function closeModalMobile() {
  modalMobile.style.display = "none";
}

function addFavoriteMaxMobileTrending(gif) {
  let iconFavMaxMobile = document.getElementById(
    "icon-fav-max-mob-trending-" + gif
  );
  iconFavMaxMobile.setAttribute("src", "./assets/icon-fav-active.svg");

  addFavoriteTrendingGral(gif);
}

function maxGifDesktopTrending(img, id, slug, user, title) {
  if (window.matchMedia("(min-width: 1023px)").matches) {
    modalDesktop.style.display = "block";
    modalDesktop.innerHTML = `
    <button class="modal-btn-close" onclick="closeModalDesktop()"><img src="./assets/button-close.svg" alt=""></button>
    <img src="${img}" alt="${id}" class="modal-gif">

    <div class="modal-bar">
        <div class="modal-texts">
            <p class="modal-user">${user}</p>
            <p class="modal-tittle">${title}</p>
        </div>
        <div>
            <button class="modal-btn" onclick="addFavoriteMax('${id}')"><img src="./assets/icon-fav-hover.svg" alt="fav-gif" id="icon-fav-max-${id}"></button>
            <button class="modal-btn" onclick="downloadGif('${img}', '${slug}')"><img src="./assets/icon-download.svg" alt="download-gif"></button>
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
  addFavoriteTrendingGral(gif);
}

// favoriteS
favoritesArray = [];
favoritesString = localStorage.getItem("gifosFavorites");

function addFavoriteTrending(gif) {
  //cambio el icono del corazon
  let iconFav = document.getElementById("icon-fav-trending-" + gif);
  iconFav.setAttribute("src", "./assets/icon-fav-active.svg");

  addFavoriteTrendingGral(gif);
}

function addFavoriteTrendingGral(gif) {
  //si en el local storage no hay nada, el array queda vacio
  if (favoritesString == null) {
    favoritesArray = [];
  } else {
    //si tengo contenido, necesito parsearlo para poder agregar uno nuevo independiente
    favoritesArray = JSON.parse(favoritesString);
  }

  favoritesArray.push(gif);
  //vuelvo a pasar a text el array para subirlo al localStorage
  favoritesString = JSON.stringify(favoritesArray);
  localStorage.setItem("gifosFavorites", favoritesString);
}

//DESCARGAR
async function downloadGifTrending(gifImg, gifName) {
  let blob = await fetch(gifImg).then((img) => img.blob());
  invokeSaveAsDialog(blob, gifName + ".gif");
}
