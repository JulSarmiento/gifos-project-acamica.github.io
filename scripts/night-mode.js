//MODO OSCURO
let body = document.getElementById("body");
let url = window.location.pathname;

let darkModeStorage = localStorage.getItem("darkMode");
let darkModeBtn = document.getElementById("menu-container-modo");
darkModeBtn.addEventListener("click", cambioMode);

//funcion cuando el darkmode esta activated
let darkModeactivated = () => {
  body.classList.add("body-dark");
  darkModeBtn.innerHTML = "Modo diurno";

  //navbar-container
  cambioLogos();
  cambioIconoCrearGifo();

  //home
  if (url === "/index.html" || url === "/gifos/index.html") {
    //funcion cambiar icono lupa violet
    cambioIconossearch();
  }

  //crear gifos
  if (url === "/creargifo.html" || url === "/gifos/creargifo.html") {
    //funcion cambiar imagenes camaras
    cambioCamaras();
  }

  localStorage.setItem("darkMode", "activated");
};

//funcion cuando el darkmode esta desactivated
let darkModeDesactivated = () => {
  body.classList.remove("body-dark");
  darkModeBtn.innerHTML = "Modo nocturno";

  //navbar-container
  cambioLogos();
  cambioIconoCrearGifo();

  //home
  if (url === "/index.html" || url === "/gifos/index.html") {
    //funcion cambiar icono lupa violet
    cambioIconossearch();
  }

  //crear gifos
  if (url === "/creargifo.html" || url === "/gifos/creargifo.html") {
    //funcion cambiar imagenes camaras
    cambioCamaras();
  }

  localStorage.setItem("darkMode", null);
};

//chequeo cuando cargo la pagina el estado del LStorage
if (darkModeStorage === "activated") {
  darkModeactivated();
}

//funcion para cambiar el mode
function cambioMode() {
  darkModeStorage = localStorage.getItem("darkMode");

  if (darkModeStorage !== "activated") {
    darkModeactivated();
  } else {
    darkModeDesactivated();
  }
}

//funciones adicionales para cambiar src de imagenes, iconos
function cambioLogos() {
  let logoMobile = document.getElementById("logo");
  let logoDesktop = document.getElementById("logo-desktop");

  if (darkModeBtn.innerHTML == "Modo nocturno") {
    logoDesktop.setAttribute("src", "./assets/logo-desktop.svg");
    logoMobile.setAttribute("src", "./assets/logo-mobile.svg");
  } else {
    logoDesktop.setAttribute("src", "./assets/logo-desktop-modo-noc.svg");
    logoMobile.setAttribute("src", "./assets/logo-mobile-modo-noc.svg");
  }
}

function cambioIconoCrearGifo() {
  let iconoCrearGifo = document.querySelector(".more-violet");
  let iconoCrearGifoHover = document.querySelector(".more-white");

  if (darkModeBtn.innerHTML == "Modo nocturno") {
    iconoCrearGifo.setAttribute("src", "./assets/button-crear-gifo.svg");
    iconoCrearGifoHover.setAttribute(
      "src",
      "./assets/button-crear-gifo-hover.svg"
    );
  } else {
    iconoCrearGifo.setAttribute("src", "./assets/button-crear-gifo-hover.svg");
    iconoCrearGifoHover.setAttribute(
      "src",
      "./assets/button-crear-gifo-dark.svg"
    );
  }
}

function cambioIconossearch() {
  if (darkModeBtn.innerHTML == "Modo nocturno") {
    iconSearch.setAttribute("src", "./assets/icon-search.svg");
    btnCloseSearch.setAttribute("src", "./assets/button-close.svg");
  } else {
    iconSearch.setAttribute("src", "./assets/icon-search-mod-noc.svg");
    btnCloseSearch.setAttribute("src", "./assets/button-close-modo-noc.svg");
  }
}

function cambioCamaras() {
  let camaraIlus = document.getElementById("camera-ilustration");
  let peliculaIlus = document.getElementById("movie-ilustration");

  if (darkModeBtn.innerHTML == "Modo nocturno") {
    camaraIlus.setAttribute("src", "./assets/camara.svg");
    peliculaIlus.setAttribute("src", "./assets/pelicula.svg");
  } else {
    camaraIlus.setAttribute("src", "./assets/camara-modo-noc.svg");
    peliculaIlus.setAttribute("src", "./assets/pelicula-modo-noc.svg");
  }
}
