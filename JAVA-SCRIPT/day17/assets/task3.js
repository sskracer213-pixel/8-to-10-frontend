
let user = JSON.parse(localStorage.getItem("user"));

if (user !== null) {

    document.getElementById("name").textContent = user.name;

    document.getElementById("email").textContent = user.email;

    document.getElementById("password").textContent = user.password;

} else {

    document.getElementById("name").textContent = "No Data";

    document.getElementById("email").textContent = "No Data";

    document.getElementById("password").textContent = "No Data";
}

