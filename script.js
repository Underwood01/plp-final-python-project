const users = { patients: {}, practitioners: {} };
const medicalRecords = {};

document.getElementById("user-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const userType = document.getElementById("user-type").value;
    const speciality = document.getElementById("speciality").value;

    if (userType === "practitioner") {
        users.practitioners[username] = { password, speciality };
        alert(`Medical Practitioner ${username} registered successfully.`);
    } else {
        users.patients[username] = { password };
        medicalRecords[username] = [];
        alert(`Patient ${username} registered successfully.`);
    }

    document.getElementById("user-form").reset();
});

document.getElementById("toggle-form").addEventListener("click", function () {
    const formTitle = document.getElementById("form-title");
    const specialityInput = document.getElementById("speciality");
    const userType = document.getElementById("user-type");

    if (formTitle.innerText === "Sign Up") {
        formTitle.innerText = "Log In";
        specialityInput.style.display = "none";
        userType.value = "practitioner";
        document.getElementById("form-container").style.display = "none";
        document.getElementById("login-container").style.display = "block";
    } else {
        formTitle.innerText = "Sign Up";
        specialityInput.style.display = "block";
        userType.value = "patient";
        document.getElementById("login-container").style.display = "none";
        document.getElementById("form-container").style.display = "block";
    }
});

document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    if (username in users.patients && users.patients[username].password === password) {
        showRecords(username);
    } else if (username in users.practitioners && users.practitioners[username].password === password) {
        alert(`Welcome Medical Practitioner ${username}.`);
        // Further functionality for practitioners can be added here.
    } else {
        alert("Incorrect username or password.");
    }
});

function showRecords(patientUsername) {
    document.getElementById("login-container").style.display = "none";
    document.getElementById("records-container").style.display = "block";
    const recordsDiv = document.getElementById("records");
    recordsDiv.innerHTML = '';

    if (patientUsername in medicalRecords && medicalRecords[patientUsername].length > 0) {
        medicalRecords[patientUsername].forEach((record, index) => {
            recordsDiv.innerHTML += `
                <div>
                    <strong>Report ${index + 1}</strong><br>
                    Practitioner: ${record.Practitioner}<br>
                    Condition: ${record.Condition}<br>
                    Description: ${record.Description}<br>
                    Prescription: ${record.Prescription}<br>
                    Solution: ${record.Solution}<br>
                </div><br>
            `;
        });
    } else {
        recordsDiv.innerHTML = '<p>No medical records available.</p>';
    }
}

document.getElementById("back-to-login").addEventListener("click", function () {
    document.getElementById("records-container").style.display = "none";
    document.getElementById("login-container").style.display = "block";
});
