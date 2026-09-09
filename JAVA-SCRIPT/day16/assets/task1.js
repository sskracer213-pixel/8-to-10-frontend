
let students = [];

function addStudent() {

    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let city = document.getElementById("city").value;

    let student = {
        name: name,
        age: age,
        city: city
    };

    students.push(student);

    let output = "";

    students.forEach(function(student) {
        output += `
            <div class="student">
                <h3>Name: ${student.name}</h3>
                <p>Age: ${student.age}</p>
                <p>City: ${student.city}</p>
            </div>
        `;
    });

    document.getElementById("studentList").innerHTML = output;
}

