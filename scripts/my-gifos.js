const apiKey = "JIHSsndx8l537Iawj5yP5zdHAEhDv4Yw";

const myGifosString = localStorage.getItem("myGifos");

let screenMyGifos = document.getElementById("my-gifos-results");

let modalMobileMG = document.createElement("div");
let modalDesktopMG = document.createElement("div");

window.addEventListener('load', () => {
  const screenMyGifosEmpty = document.getElementById("my-gifos-empty");

  if (!myGifosString || myGifosString == "[]") {
    screenMyGifosEmpty.style.display = "block";
    screenMyGifos.style.display = "none";
  } else {
    const myGifosArray = JSON.parse(myGifosString);
    const urlmyGifos = `https://api.giphy.com/v1/gifs?api_key=${apiKey}&ids=${myGifosArray}`;
    //console.log(urlmyGifos);
    // https://api.giphy.com/v1/user/favorites?api_key=Gc7131jiJuvI7IdN0HZ1D7nh0ow5BU6g&offset=0&fields=id&limit=5000
    fetch(urlmyGifos)
      .then((response) => response.json())

      .then((content) => {
        console.log(content);
        mostrarmyGifos(content);
      })
      .catch((err) => {
        console.error("fetch mis gifos fallo", err);
      });
  }
});

function mostrarmyGifos({data}) {
  data.forEach(gif => {
    const {
      images,
      id,
      username,
      title,
      slug,
    } = gif;

    screenMyGifos.innerHTML += `
        <div class="results-gif-box-my-gifos" onclick="maxGifMobileMG('${images.downsized.url}', '${id}', '${slug}', '${username}', '${title}')">
          <div class="gif-actions-my-gifos-results">
            <div class="icons-actions-gif">
              <button class="icons-actions-box delete" onclick="deleteGifo('${id}')">
                <img src="./assets/icon_trash.svg" alt="icon-delete">
              </button>
              <button class="icons-actions-box download" onclick="downloadGif('${images.downsized.url}', '${slug}')">
                <img src="./assets/icon-download.svg" alt="icon-download" >
              </button>
              <button class="icons-actions-box max" onclick="maxGifDesktopMG('${images.downsized.url}', '${id}', '${slug}', '${username}', '${title}')">
                <img src="./assets/icon-max.svg" alt="icon-max">
              </button>
            </div>
            <div class="text-description-gif-my-gifos">
              <p class="user-gif-my-gifos">${username}</p>
              <p class="tittle-gif-my-gifos">${title}</p>
            </div>
          </div>
          <img src="${images.downsized.url}" alt="${title}" class="results-gif">
      </div>
    `;
  }); 
}

//FUNCION delete GIF
function deleteGifo(gif) {
  let arrayAuxGifos = [];
  arrayAuxGifos = JSON.parse(myGifosString);
  let indiceGif = arrayAuxGifos.indexOf(gif);

  console.log(arrayAuxGifos);
  console.log(indiceGif);

  arrayAuxGifos.splice(indiceGif, 1);

  let nuevomyGifosString = JSON.stringify(arrayAuxGifos);
  localStorage.setItem("myGifos", nuevomyGifosString);

  location.reload();
}

//FUNCION DESCARGAR GIF
async function downloadGif(gifImg, gifName) {
  let blob = await fetch(gifImg).then((img) => img.blob());
  invokeSaveAsDialog(blob, gifName + ".gif");
}

//FUNCION MAXIMIZAR GIF mobile
function maxGifMobileMG(img, id, slug, user, title) {
  if (window.matchMedia("(max-width: 1023px)").matches) {
    modalMobileMG.style.display = "block";
    modalMobileMG.innerHTML = `
    <button class="modal-btn-close" onclick="closeModalMobileMG()"><img src="./assets/button-close.svg" alt=""></button>
    <img src="${img}" alt="${id}" class="modal-gif">

    <div class="modal-bar">
        <div class="modal-texts">
            <p class="modal-user">${user}</p>
            <p class="modal-tittle">${title}</p>
        </div>
        <div>
            <button class="modal-btn" onclick="deleteGifo('${id}')"><img src="./assets/icon_trash.svg" alt="delete-gif"></button>
            <button class="modal-btn" onclick="downloadGif('${img}', '${slug}')"><img src="./assets/icon-download.svg" alt="download-gif"></button>
        </div>
    </div>
    `;
    modalMobileMG.classList.add("modal-activated");
    document.body.appendChild(modalMobileMG);
  }
}

function closeModalMobileMG() {
  modalMobileMG.style.display = "none";
}

//FUNCION MAXIMIZAR DESKTOP
function maxGifDesktopMG(img, id, slug, user, title) {
  if (window.matchMedia("(min-width: 1023px)").matches) {
    modalDesktopMG.style.display = "block";
    modalDesktopMG.innerHTML = `
    <button class="modal-btn-close" onclick="closeModalDesktopMG()"><img src="./assets/button-close.svg" alt=""></button>
    <img src="${img}" alt="${id}" class="modal-gif">

    <div class="modal-bar">
        <div class="modal-texts">
            <p class="modal-user">${user}</p>
            <p class="modal-tittle">${title}</p>
        </div>
        <div>
            <button class="modal-btn" onclick="deleteGifo('${id}')"><img src="./assets/icon_trash.svg" alt="delete-gif"></button>
            <button class="modal-btn" onclick="downloadGif('${img}', '${slug}')"><img src="./assets/icon-download.svg" alt="download-gif"></button>
        </div>
    </div>
    `;
    modalDesktopMG.classList.add("modal-activated");
    document.body.appendChild(modalDesktopMG);
  }
}

function closeModalDesktopMG() {
  modalDesktopMG.style.display = "none";
}
