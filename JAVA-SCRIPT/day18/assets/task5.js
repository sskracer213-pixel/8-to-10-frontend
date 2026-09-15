 
function getData() {

    fetch("https://jsonplaceholder.typicode.com/users/1")

        .then((response) => {
            return response.json();
        })

        .then((data) => {
            console.log(data);

            document.getElementById("output").textContent =
                data.name;
        })

        .catch((error) => {
            console.log(error);

            document.getElementById("output").textContent =
                "Error loading data";
        });
}

