
function runPromise() {

    const myPromise = new Promise((resolve, reject) => {

        let success = true;

        if (success) {
            resolve("Promise resolved successfully!");
        } else {
            reject("Promise rejected!");
        }

    });

    myPromise.then((result) => {
        console.log(result);
        document.getElementById("output").textContent = result;
    });
}
