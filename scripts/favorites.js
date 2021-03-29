function loadFavorites() {
  const screenFavorites = document.getElementById("favorites-results");
  const favorites = getFavorites();

  if (favorites.length === 0) {
    const screenFavoritesEmpty = document.getElementById("favorites-empty");
    screenFavoritesEmpty.style.display = "block";
    screenFavorites.style.display = "none";
    return;
  }

  fetch(
    `https://api.giphy.com/v1/gifs?ids=${favorites.toString()}&api_key=${API_KEY}`
  )
    .then((response) => response.json())
    .then(({ data }) => {
      let innerHTML = '';

      data.forEach( (data) => {
        innerHTML += printCard(data);
      } );

      screenFavorites.innerHTML = innerHTML;
    })
    .catch((err) => {
      console.error("fetch favoritos fallo", err);
    });
}

window.addEventListener("load", loadFavorites);
