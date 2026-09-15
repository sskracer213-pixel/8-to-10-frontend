
function runCallback() {

    function message(callback) {
        console.log("Hello from function");
        callback();
    }

    message(() => {
        console.log("Callback function executed");
        document.getElementById("output").textContent =
            "Callback function executed";
    });
}
