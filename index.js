
document.addEventListener('DOMContentLoaded', () => {

    const authLinkContainer = document.getElementById('auth-link');
    const loggedInUserJSON = sessionStorage.getItem('loggedInUser');

    if (loggedInUserJSON) {
        // If a user is logged in, create the dropdown menu
        const loggedInUser = JSON.parse(loggedInUserJSON);

        // This HTML will replace the "Sign In" button
        authLinkContainer.innerHTML = `
            <div class="user-menu">
                <button class="user-name-btn">
                    ${loggedInUser.firstName} <i class="fas fa-caret-down"></i>
                </button>
                <div class="dropdown-content">
                    <a href="#" id="logout-btn">Logout</a>
                </div>
            </div>
        `;
        authLinkContainer.removeAttribute('href'); // Remove link to signin.html

        // --- Add functionality to the new dropdown ---
        const userNameBtn = authLinkContainer.querySelector('.user-name-btn');
        const dropdownContent = authLinkContainer.querySelector('.dropdown-content');
        const logoutBtn = document.getElementById('logout-btn');

        // Show/hide the dropdown when the name is clicked
        userNameBtn.addEventListener('click', () => {
            dropdownContent.classList.toggle('show');
        });

        // Logout when the logout button is clicked
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            sessionStorage.removeItem('loggedInUser');
            window.location.reload();
        });

        // Close the dropdown if the user clicks anywhere else
        window.addEventListener('click', (event) => {
            if (!event.target.matches('.user-name-btn')) {
                if (dropdownContent.classList.contains('show')) {
                    dropdownContent.classList.remove('show');
                }
            }
        });
    }

    // This part remains the same to load restaurants
    const foodItemsSection = document.getElementById('food-items-section');
    const fetchRestaurants = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/restaurants');
            if (!response.ok) throw new Error('Network response was not ok');
            const restaurants = await response.json();
            
            foodItemsSection.innerHTML = '';
            restaurants.forEach(restaurant => {
                const card = document.createElement('div');
                card.className = 'restaurant-card';
                card.innerHTML = `
                    <a href="fooddelivery.html" class="restaurant-link">
                        <div class="restaurant-card-content">
                            <h3>${restaurant.name}</h3>
                            <p class="cuisine">${restaurant.cuisine}</p>
                            <p class="location">${restaurant.location}</p>
                        </div>
                    </a>
                `;
                foodItemsSection.appendChild(card);
            });
        } catch (error) {
            console.error('Failed to fetch restaurants:', error);
            foodItemsSection.innerHTML = '<p class="error-message">Could not load restaurants.</p>';
        }
    };

    if (foodItemsSection) {
      fetchRestaurants();
    }
});
