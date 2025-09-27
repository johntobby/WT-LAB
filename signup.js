document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signup-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = form.username.value;
    const password = form.password.value;
console.log(username,password);
    fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data => {
      if (data.error) alert(data.error);
      else {
        alert("Signup successful! Redirecting to login page...");
        window.location.href = "signin.html"; // Redirect to login
      }
    })
    .catch(err => console.error(err));
  });
});