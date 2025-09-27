function searchRestaurants() {
  let input = document.getElementById("searchInput").value.toLowerCase();
  let cards = document.getElementsByClassName("restaurant-card");

  for (let card of cards) {
    let imgAlt = card.querySelector("img").alt.toLowerCase();
    if (imgAlt.includes(input)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  }
}