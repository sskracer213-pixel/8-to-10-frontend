 

function handlePromise() {

    const promise = new Promise((resolve, reject) => {

        let success = true;

        if (success) {
            resolve("Data received successfully");
        } else {
            reject("Something went wrong");
        }

    });

    promise
        .then((result) => {
            console.log(result);
            document.getElementById("output").textContent = result;
        })
        .catch((error) => {
            console.log(error);
            document.getElementById("output").textContent = error;
        })
        .finally(() => {
            console.log("Promise completed");
        });
}