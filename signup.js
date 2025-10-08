// In signup.js

document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');

    signupForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Get user input from the form fields
        const phone = document.getElementById('phone').value.trim();
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // --- Client-Side Validation ---
        if (password !== confirmPassword) {
            alert("Passwords do not match. Please try again.");
            return;
        }

        // --- Prepare data for the API ---
        const userData = {
            phone,
            firstName,
            lastName,
            email,
            password
        };

        // --- Send data to the backend API ---
        try {
            const response = await fetch('http://localhost:5000/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const result = await response.json();

            if (response.ok) { // Status code is 2xx
                alert(result.message);
                window.location.href = 'signin.html'; // Redirect to login page
            } else { // Status code is 4xx or 5xx
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error('Registration failed:', error);
            alert('Registration failed. Please try again later.');
        }
    });
});
