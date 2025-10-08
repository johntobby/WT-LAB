// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');

    signupForm.addEventListener('submit', (event) => {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Get user input from the form fields
        const phone = document.getElementById('phone').value.trim();
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // --- Form Validation ---

        // Check if passwords match
        if (password !== confirmPassword) {
            alert("Passwords do not match. Please try again.");
            return;
        }

        // Check for password length
        if (password.length < 8) {
            alert("Password must be at least 8 characters long.");
            return;
        }

        // --- Check for Existing User ---

        // Retrieve existing users from localStorage or initialize an empty array
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Check if the email or phone number is already registered
        const userExists = users.some(user => user.email === email || user.phone === phone);

        if (userExists) {
            alert("A user with this email or phone number already exists.");
            return;
        }

        // --- Store New User ---

        // Create a new user object
        const newUser = {
            phone,
            firstName,
            lastName,
            email,
            password // Note: In a real app, NEVER store passwords in plain text. They should be hashed.
        };

        // Add the new user to the array
        users.push(newUser);

        // Save the updated users array back to localStorage
        localStorage.setItem('users', JSON.stringify(users));

        // --- Success and Redirect ---

        alert("Sign-up successful! You will now be redirected to the login page.");
        
        // Redirect to the login page
        window.location.href = 'signin.html';
    });
});
