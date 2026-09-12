// Get students from LocalStorage
let students = JSON.parse(localStorage.getItem("students")) || [];


// Get HTML elements
const studentForm = document.getElementById("studentForm");
const studentTableBody = document.getElementById("studentTableBody");
const searchInput = document.getElementById("searchInput");
const emptyMessage = document.getElementById("emptyMessage");


// Dashboard elements
const totalStudents = document.getElementById("totalStudents");
const maleStudents = document.getElementById("maleStudents");
const femaleStudents = document.getElementById("femaleStudents");
const averageMarks = document.getElementById("averageMarks");


// Add Student
studentForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("studentName").value;
    const roll = document.getElementById("rollNumber").value;
    const email = document.getElementById("email").value;
    const gender = document.getElementById("gender").value;
    const course = document.getElementById("course").value;
    const marks = Number(document.getElementById("marks").value);

    const student = {
        id: Date.now(),
        name: name,
        roll: roll,
        email: email,
        gender: gender,
        course: course,
        marks: marks
    };

    students.push(student);

    saveStudents();

    studentForm.reset();

    displayStudents();

    updateDashboard();

    alert("Student added successfully!");

});


// Save students
function saveStudents() {

    localStorage.setItem("students", JSON.stringify(students));

}


// Display students
function displayStudents(studentList = students) {

    studentTableBody.innerHTML = "";

    if (studentList.length === 0) {

        emptyMessage.style.display = "block";

        return;

    }

    emptyMessage.style.display = "none";


    studentList.forEach(function(student, index) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.roll}</td>
            <td>${student.email}</td>
            <td>${student.gender}</td>
            <td>${student.course}</td>
            <td>${student.marks}</td>
            <td>
                <button
                    class="delete-btn"
                    onclick="deleteStudent(${student.id})">
                    Delete
                </button>
            </td>
        `;

        studentTableBody.appendChild(row);

    });

}


// Delete student
function deleteStudent(id) {

    const confirmation = confirm(
        "Are you sure you want to delete this student?"
    );

    if (!confirmation) {
        return;
    }

    students = students.filter(function(student) {

        return student.id !== id;

    });

    saveStudents();

    displayStudents();

    updateDashboard();

}


// Search student
searchInput.addEventListener("input", function() {

    const searchText = searchInput.value.toLowerCase();

    const filteredStudents = students.filter(function(student) {

        return (
            student.name.toLowerCase().includes(searchText) ||
            student.roll.toLowerCase().includes(searchText) ||
            student.course.toLowerCase().includes(searchText)
        );

    });

    displayStudents(filteredStudents);

});


// Update dashboard
function updateDashboard() {

    totalStudents.textContent = students.length;


    const maleCount = students.filter(function(student) {

        return student.gender === "Male";

    }).length;

    maleStudents.textContent = maleCount;


    const femaleCount = students.filter(function(student) {

        return student.gender === "Female";

    }).length;

    femaleStudents.textContent = femaleCount;


    if (students.length === 0) {

        averageMarks.textContent = "0";

    } else {

        const totalMarks = students.reduce(function(total, student) {

            return total + student.marks;

        }, 0);

        const average = totalMarks / students.length;

        averageMarks.textContent = average.toFixed(2);

    }

}


// Load students when page opens
displayStudents();

updateDashboard();