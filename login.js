document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    // Simple validation
    if (email === "test@example.com" && password === "password123") {
        alert("Login successful!");
    } else {
        document.getElementById("error-message").textContent = "Invalid email or password.";
    }
});
