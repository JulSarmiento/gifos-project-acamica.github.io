
// TRENDING GIFOS
//1. Traigo el array con trending gifos
//2. reemplazo los gifos mostrados con el contenido del array

//funciones para slide desktop
//let numberOfImg = document.querySelectorAll('.gif-container').length;
let imageIndex = 1;
let translateX = 0;

function loadTrending() {
  const sliderTrendingGifos = document.getElementById('trending-slider');

  document.getElementById("trending-btn-previous").addEventListener("click", () => {
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
  });

  document.getElementById("trending-btn-next").addEventListener("click", () => {
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
  });
  
  let url = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=8`;

  fetch(url)
    .then((resp) => resp.json()) //me trae el json con los 4 trending gifos
    .then((content) => {
      //object with data, pagination, meta
      let trendingGifArray = content.data || [];

      let trendingGIFOhtml = "";

      trendingGifArray.forEach( ({ id, images, username, title, slug }) => {
        trendingGIFOhtml += printCard({ id, images, username, title, slug })
      });

      sliderTrendingGifos.innerHTML = trendingGIFOhtml;
    })
    .catch((err) => {
      console.log(err);
    });
}

window.addEventListener('load', loadTrending);