document.addEventListener("DOMContentLoaded", function () {
  // Search box validation
  const searchBtn = document.querySelector(".search-btn");
  const locationInput = document.querySelector(".search-box input:nth-child(1)");
  const restaurantInput = document.querySelector(".search-box input:nth-child(2)");

  searchBtn.addEventListener("click", function () {
    const location = locationInput.value.trim();
    const restaurant = restaurantInput.value.trim();

    if (location === "" || restaurant === "") {
      alert("⚠ Please enter both location and restaurant name!");
    } else {
      alert(`🔍 Searching for "${restaurant}" near "${location}"...`);
    }
  });

  // Dynamic greeting
  const heroSection = document.querySelector(".hero");
  if (heroSection) {
    const greeting = document.createElement("p");
    greeting.style.fontSize = "20px";
    greeting.style.fontWeight = "bold";
    greeting.style.color = "#e63946";
    greeting.style.marginTop = "10px";

    const hour = new Date().getHours();
    if (hour < 12) greeting.textContent = "🌅 Good Morning! Order your breakfast now 🍳";
    else if (hour < 18) greeting.textContent = "☀ Good Afternoon! Grab your lunch 😋";
    else greeting.textContent = "🌙 Good Evening! Perfect time for dinner 🍽";

    heroSection.appendChild(greeting);
  }

  // Fetch food items
  const foodContainer = document.getElementById("food-items-section");
  fetch(`http://localhost:5000/food-items?ts=${Date.now()}`)
    .then(res => res.json())
    .then(items => {
        console.log(items)
      items.forEach(item => {
        const card = document.createElement("div");
        card.style.width = "200px";
        card.style.border = "1px solid #ddd";
        card.style.borderRadius = "8px";
        card.style.padding = "10px";
        card.style.textAlign = "center";
        card.innerHTML = `
          <img src="${item.image_url}" alt="${item.name}" style="width:100%; height:120px; object-fit:cover; border-radius:5px;">
          <h4>${item.name}</h4>
          <p>${item.restaurant}</p>
          <p>₹${item.price}</p>
        `;
        foodContainer.appendChild(card);
      });
    })
    .catch(err => console.error(err));
});
document.addEventListener("DOMContentLoaded", () => {
  const signinBtn = document.querySelector(".signin-btn");
  const loggedInUser = localStorage.getItem("loggedInUser");

  if (loggedInUser) {
    if (signinBtn) signinBtn.style.display = "none";

    const nav = document.querySelector(".navbar nav");
    const welcome = document.createElement("span");
    welcome.textContent = `Welcome, ${loggedInUser}!`;
    welcome.style.color = "#e63946";
    welcome.style.fontWeight = "bold";
    welcome.style.marginLeft = "10px";
    nav.appendChild(welcome);
    
    const logOut = document.createElement("button");
    logOut.classList.add("signin-btn");
    logOut.textContent = "Logout";
    nav.appendChild(logOut);

    // Logout functionality
    logOut.addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      window.location.reload(); // refresh to show login again
    });
  }
  
});
