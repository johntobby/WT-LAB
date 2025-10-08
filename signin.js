document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const identifier = document.getElementById('identifier').value.trim();
        const password = document.getElementById('password').value;

        const users = JSON.parse(localStorage.getItem('users')) || [];

        const foundUser = users.find(user => 
            (user.email === identifier || user.phone === identifier) && user.password === password
        );

        if (foundUser) {
            // 1. Save the logged-in user's data to sessionStorage
            sessionStorage.setItem('loggedInUser', JSON.stringify(foundUser));
            
            // 2. Redirect to the homepage
            window.location.href = 'index.html'; 
        } else {
            alert("Invalid email/phone or password. Please try again.");
        }
    });
});
