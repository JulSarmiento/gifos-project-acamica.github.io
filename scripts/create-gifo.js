const apiKey = "JIHSsndx8l537Iawj5yP5zdHAEhDv4Yw";

const btnStart = document.getElementById("btn-create-gifo-start");
const btnRecordr = document.getElementById("btn-create-gifo-record");
const btnfinish = document.getElementById("btn-create-gifo-finish");
const btnUploadGifo = document.getElementById("btn-create-gifo-upload");

const steptActive = document.querySelectorAll("#create-gifo-step-number");
const recordCounter = document.getElementById("counter-record");
const repeatRecord = document.getElementById("counter-repeat-capture");

const overlayLoading = document.getElementById("overlay-video");
const iconLoading = document.getElementById("overlay-video-icon");
const textLoading = document.getElementById("overlay-video-paragraph");
const actionsLoading = document.getElementById("overlay-video-actions");
const overlayActions = document.getElementById("overlay-video-actions");

let recorder;
let blob;
let dateStarted;
const myGifosArray = JSON.parse(localStorage.getItem("myGifos") || '[]');

const form = new FormData();
form.append("api_key", apiKey);
form.append('username', 'jasa1999');
form.append('tags', 'acamica,gifos,byjulh');

const video = document.getElementById("record-video");
const gifRecorded = document.getElementById("gif-recorded");

/**
 * Calculates gif time lap and return string
 *
 * @param {number} secs - Seconds
 * @returns {string} Seconds representation
 */
function calculateTimeDuration(secs) {
  let hr = Math.floor(secs / 3600);
  let min = Math.floor((secs - hr * 3600) / 60);
  let sec = Math.floor(secs - hr * 3600 - min * 60);

  if (min < 10) {
    min = "0" + min;
  }

  if (sec < 10) {
    sec = "0" + sec;
  }

  return hr + ":" + min + ":" + sec;
}

/**
 * Download created gif
 *
 * @param {string} gifImg - Gif url
 */
async function downloadGifCreated(gifImg) {
  let blob = await fetch(gifImg).then((img) => img.blob());
  invokeSaveAsDialog(blob, "migifo.gif");
}

btnStart.addEventListener("click", () => {
  btnStart.style.display = "none";

  let tittleRecord = document.getElementById("tittle-record-tittle");
  let textRecord = document.getElementById("text-record-gifo");
  tittleRecord.innerHTML = "¿Nos das acceso </br>a tu cámara?";
  textRecord.innerHTML =
    "El acceso a tu camara será válido sólo </br>por el tiempo en el que estés creando el GIFO.";

  steptActive[0].classList.add("step-active");

  navigator.mediaDevices
    .getUserMedia({ audio: false, video: { width: 480, height: 320 } })

    .then(function (mediaStream) {
      tittleRecord.style.display = "none";
      textRecord.style.display = "none";
      btnRecordr.style.display = "block";

      steptActive[0].classList.remove("step-active");
      steptActive[1].classList.add("step-active");

      video.style.display = "block";
      video.srcObject = mediaStream;
      video.onloadedmetadata = function (e) {
        video.play();
      };

      recorder = RecordRTC(mediaStream, {
        type: "gif",
      });
    });
});

btnRecordr.addEventListener("click", () => {
  recorder.startRecording();
  console.log("grabando gif");

  btnRecordr.style.display = "none";
  btnfinish.style.display = "block";

  recordCounter.style.display = "block";
  repeatRecord.style.display = "none";

  dateStarted = new Date().getTime();

  (function looper() {
    if (!recorder) {
      return;
    }
    recordCounter.innerHTML = calculateTimeDuration(
      (new Date().getTime() - dateStarted) / 1000
    );
    setTimeout(looper, 1000);
  })();
});

btnfinish.addEventListener("click", () => {
  console.log("gif terminado");

  btnfinish.style.display = "none";
  btnUploadGifo.style.display = "block";

  recordCounter.style.display = "none";
  repeatRecord.style.display = "block";

  recorder.stopRecording(() => {
    video.style.display = "none";
    gifRecorded.style.display = "block";

    blob = recorder.getBlob();
    gifRecorded.src = URL.createObjectURL(recorder.getBlob());

    form.append("file", recorder.getBlob(), "myGif.gif");
  });
});

btnUploadGifo.addEventListener("click", () => {
  overlayLoading.style.display = "flex";
  btnUploadGifo.style.display = "none";
  steptActive[1].classList.remove("step-active");
  steptActive[2].classList.add("step-active");
  repeatRecord.style.display = "none";

  fetch(`https://upload.giphy.com/v1/gifs`, {
    method: "POST",
    body: form,
  })
    .then((response) => response.json())
    .then(({data}) => {
      console.log('Upload response data', data);

      const { id: myGifId} = data || {};

      actionsLoading.style.display = "block";
      iconLoading.setAttribute("src", "./assets/check.svg");
      textLoading.innerText = "GIFO subido con éxito";
      overlayActions.innerHTML = `
        <button class="overlay-video-button" id="btn-create-gifo-download" onclick="downloadGifCreated('${myGifId}')">
          <img src="./assets/icon-download.svg" alt="download">
        </button>
        <button class="overlay-video-button" id="btn-create-gifo-link">
          <img src="./assets/icon-link.svg" alt="link">
        </button>
      `;

      myGifosArray.push(myGifId);
      myGifosString = JSON.stringify(myGifosArray);
      localStorage.setItem("myGifos", myGifosString);
    })

    .catch((error) => console.log("error al subir gif a GIPHY" + error));
});

repeatRecord.addEventListener("click", () => {
  recorder.clearRecordedData();
  console.log("re-grabando gif");

  repeatRecord.style.display = "none";

  btnUploadGifo.style.display = "none";

  gifRecorded.style.display = "none";

  btnRecordr.style.display = "block";

  navigator.mediaDevices
    .getUserMedia({ audio: false, video: { width: 480, height: 320 } })

    .then(function (mediaStream) {
      video.style.display = "block";
      video.srcObject = mediaStream;
      video.onloadedmetadata = function (e) {
        video.play();
      };

      recorder = RecordRTC(mediaStream, {
        type: "gif",
      });
    });
});
