document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signin-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = form.username.value;
    const password = form.password.value;

    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data => {
      if (data.error) alert(data.error);
      else {
        alert("Login successful! Redirecting to homepage...");
        localStorage.setItem("loggedInUser", username);
        window.location.href = "index.html"; // Redirect to home
      }
    })
    .catch(err => console.error(err));
  });
});