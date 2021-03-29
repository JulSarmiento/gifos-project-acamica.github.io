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
    const urlmyGifos = `https://api.giphy.com/v1/gifs?api_key=${API_KEY}&ids=${myGifosArray}`;
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

    screenMyGifos.innerHTML += printCard(id, images, username, title, slug)
}
