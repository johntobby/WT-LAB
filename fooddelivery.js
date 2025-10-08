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
}document.addEventListener('DOMContentLoaded', () => {

  // --- SAMPLE DATA (In a real app, this comes from a backend API) ---
  const menuData = {
    "The Burger Shack": [
      { name: "Classic Beef Burger", price: 250 },
      { name: "Chicken Zinger Burger", price: 280 },
      { name: "Veggie Burger", price: 220 },
      { name: "French Fries", price: 100 }
    ],
    "Pizza Palace": [
      { name: "Margherita Pizza", price: 350 },
      { name: "Pepperoni Pizza", price: 450 },
      { name: "Garlic Bread", price: 150 },
      { name: "Coke", price: 60 }
    ],
    "Marlin Cay": [
      { name: "Fish and Chips", price: 500 },
      { name: "Sea Food Platter", price: 900 },
      { name: "Virgin Mojito", price: 200 }
    ],
    "Frosty Treats": [
      { name: "Chocolate Sundae", price: 180 },
      { name: "Vanilla Scoop", price: 100 },
      { name: "Brownie Fudge", price: 220 }
    ],
    "Bhawarchi": [
      { name: "Chicken Biryani", price: 320 },
      { name: "Mutton Biryani", price: 420 },
      { name: "Veg Biryani", price: 250 }
    ],
    "The Shawarma Spot": [
      { name: "Chicken Shawarma", price: 180 },
      { name: "Falafel Wrap", price: 150 }
    ]
  };

  // --- STATE ---
  let cart = [];

  // --- DOM ELEMENTS ---
  const restaurantList = document.getElementById('restaurantList');
  const menuModal = document.getElementById('menuModal');
  const modalRestaurantName = document.getElementById('modalRestaurantName');
  const menuItemsContainer = document.getElementById('menuItems');
  const closeMenuModalBtn = document.getElementById('closeMenuModal');
  const cartSidebar = document.getElementById('cartSidebar');
  const cartIcon = document.getElementById('cartIcon');
  const closeCartBtn = document.getElementById('closeCart');
  const cartItemsContainer = document.getElementById('cartItems');
  const cartItemCount = document.getElementById('cartItemCount');
  const cartSubtotal = document.getElementById('cartSubtotal');
  
  // --- FUNCTIONS ---

  // Function to open the menu modal
  const openMenuModal = (restaurantName) => {
    modalRestaurantName.textContent = restaurantName;
    menuItemsContainer.innerHTML = ''; // Clear previous menu items

    const menu = menuData[restaurantName] || [];
    if (menu.length === 0) {
      menuItemsContainer.innerHTML = '<p>No menu available for this restaurant.</p>';
    } else {
      menu.forEach(item => {
        const menuItemEl = document.createElement('div');
        menuItemEl.className = 'menu-item';
        menuItemEl.innerHTML = `
          <div class="menu-item-details">
            <h4>${item.name}</h4>
            <p>₹${item.price}</p>
          </div>
          <button class="add-item-btn" data-name="${item.name}" data-price="${item.price}">Add</button>
        `;
        menuItemsContainer.appendChild(menuItemEl);
      });
    }
    menuModal.style.display = 'flex';
  };

  // Function to close the menu modal
  const closeMenuModal = () => {
    menuModal.style.display = 'none';
  };

  // Function to open the cart
  const openCart = () => {
    cartSidebar.classList.add('open');
  };

  // Function to close the cart
  const closeCart = () => {
    cartSidebar.classList.remove('open');
  };

  // Function to add an item to the cart
  const addToCart = (name, price) => {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ name, price, quantity: 1 });
    }
    updateCart();
  };
  
  // Function to update item quantity in cart
  const updateQuantity = (name, newQuantity) => {
      const item = cart.find(item => item.name === name);
      if (item) {
          if (newQuantity > 0) {
              item.quantity = newQuantity;
          } else {
              // Remove item if quantity is 0 or less
              cart = cart.filter(cartItem => cartItem.name !== name);
          }
      }
      updateCart();
  };


  // Function to update the entire cart UI
  const updateCart = () => {
    cartItemsContainer.innerHTML = '';
    let subtotal = 0;
    let totalItems = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-message">Your cart is empty.</p>';
    } else {
        cart.forEach(item => {
            subtotal += item.price * item.quantity;
            totalItems += item.quantity;

            const cartItemEl = document.createElement('div');
            cartItemEl.className = 'cart-item';
            cartItemEl.innerHTML = `
                <div class="cart-item-info">
                    <h5>${item.name}</h5>
                    <p>₹${item.price}</p>
                </div>
                <div class="cart-item-actions">
                    <button class="quantity-btn" data-name="${item.name}" data-action="decrease">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" data-name="${item.name}" data-action="increase">+</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItemEl);
        });
    }

    cartSubtotal.textContent = `₹${subtotal.toFixed(2)}`;
    cartItemCount.textContent = totalItems;
  };
  
  // --- EVENT LISTENERS ---

  // Event delegation for clicking on restaurant cards
  restaurantList.addEventListener('click', (e) => {
    const card = e.target.closest('.restaurant-card');
    if (card) {
      const restaurantName = card.dataset.restaurantName;
      openMenuModal(restaurantName);
    }
  });

  // Event delegation for adding items from the menu
  menuItemsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-item-btn')) {
      const name = e.target.dataset.name;
      const price = parseFloat(e.target.dataset.price);
      addToCart(name, price);
    }
  });

  // Event delegation for updating quantity in cart
  cartItemsContainer.addEventListener('click', e => {
      if (e.target.classList.contains('quantity-btn')) {
          const name = e.target.dataset.name;
          const action = e.target.dataset.action;
          const item = cart.find(i => i.name === name);
          
          if (item) {
              let newQuantity = item.quantity;
              if (action === 'increase') {
                  newQuantity++;
              } else if (action === 'decrease') {
                  newQuantity--;
              }
              updateQuantity(name, newQuantity);
          }
      }
  });


  // Close menu modal
  closeMenuModalBtn.addEventListener('click', closeMenuModal);
  menuModal.addEventListener('click', (e) => {
    if (e.target === menuModal) { // Close if clicking on overlay
      closeMenuModal();
    }
  });
  
  // Open and close cart sidebar
  cartIcon.addEventListener('click', openCart);
  closeCartBtn.addEventListener('click', closeCart);
});
