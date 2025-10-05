document.addEventListener('DOMContentLoaded', () => {
    // Get all the elements we need to manipulate
    const toggleLink = document.getElementById('toggle-link');
    const formTitle = document.getElementById('form-title');
    const signupFields = document.getElementById('signup-fields');
    const submitBtn = document.getElementById('submit-btn');
    const loginTerms = document.getElementById('login-terms');
    const signupTerms = document.getElementById('signup-terms');
    const refText = document.getElementById('ref-text');

    // Variable to track the current state (true for login, false for sign-up)
    let isLoginView = true;

    // Add a click event listener to the toggle link
    toggleLink.addEventListener('click', (event) => {
        // Prevent the link from navigating
        event.preventDefault();

        // Toggle the state
        isLoginView = !isLoginView;

        if (isLoginView) {
            // Switch to Login View
            formTitle.textContent = 'Login';
            toggleLink.textContent = 'create an account';
            submitBtn.textContent = 'LOGIN';
            
            // Hide sign-up specific elements
            signupFields.classList.add('hidden');
            signupTerms.classList.add('hidden');
            refText.classList.add('hidden');
            
            // Show login specific elements
            loginTerms.classList.remove('hidden');

        } else {
            // Switch to Sign Up View
            formTitle.textContent = 'Sign up';
            toggleLink.textContent = 'login to your account';
            submitBtn.textContent = 'CONTINUE';
            
            // Show sign-up specific elements
            signupFields.classList.remove('hidden');
            signupTerms.classList.remove('hidden');
            refText.classList.remove('hidden');

            // Hide login specific elements
            loginTerms.classList.add('hidden');
        }
    });
});
