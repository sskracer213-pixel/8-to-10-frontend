
function login() {

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let user = JSON.parse(localStorage.getItem("user"));

    if (user === null) {
        document.getElementById("message").textContent =
            "User not registered";
        return;
    }

    if (email === user.email && password === user.password) {
        document.getElementById("message").textContent =
            "Login Successful!";
    } else {
        document.getElementById("message").textContent =
            "Invalid Email or Password";
    }
}

