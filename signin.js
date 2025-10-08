// In signin.js

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission

        // Get user input from the form fields
        // Note: The login API uses 'email', so we'll treat the identifier as email for now.
        const email = document.getElementById('identifier').value.trim(); 
        const password = document.getElementById('password').value;

        // Prepare data for the API
        const loginData = {
            email,
            password
        };

        // Send data to the backend API
        try {
            const response = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            const result = await response.json();

            if (response.ok) { // Status is 200-299
                // Save user data to sessionStorage to keep them logged in
                sessionStorage.setItem('loggedInUser', JSON.stringify(result.user));

                alert(result.message); // e.g., "Login successful!"
                window.location.href = 'index.html'; // Redirect to the homepage
            } else {
                alert(`Error: ${result.message}`); // e.g., "Invalid credentials"
            }
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed. Please try again later.');
        }
    });
});
