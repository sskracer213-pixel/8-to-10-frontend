 async function runAsync() {

    const promise = new Promise((resolve) => {
        resolve("Async operation completed!");
    });

    const result = await promise;

    console.log(result);

    document.getElementById("output").textContent = result;
}
