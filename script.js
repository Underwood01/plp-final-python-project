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
        document.getElementById("login-container").style.display = "none";
        document.getElementById("add-record-container").style.display = "block";
    } else {
        alert("Incorrect username or password.");
    }
});

document.getElementById("add-record-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const patientUsername = document.getElementById("record-patient").value;
    const condition = document.getElementById("record-condition").value;
    const description = document.getElementById("record-description").value;
    const prescription = document.getElementById("record-prescription").value;
    const solution = document.getElementById("record-solution").value;

    if (!(patientUsername in medicalRecords)) {
        medicalRecords[patientUsername] = [];
    }

    const record = {
        Practitioner: username,
        Condition: condition,
        Description: description,
        Prescription: prescription,
        Solution: solution
    };

    medicalRecords[patientUsername].push(record);
    alert("Medical record added successfully.");
    document.getElementById("add-record-form").reset();
});

document.getElementById("send-record").addEventListener("click", function () {
    const recipientUsername = document.getElementById("send-to-username").value;
    if (recipientUsername in users.practitioners) {
        users.practitioners[recipientUsername].receivedRecords = users.practitioners[recipientUsername].receivedRecords || [];
        users.practitioners[recipientUsername].receivedRecords.push(medicalRecords[document.getElementById("record-patient").value].slice(-1)[0]);
        alert("Record sent successfully.");
    } else {
        alert("Recipient practitioner not found.");
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

document.getElementById("view-records").addEventListener("click", function () {
    const patientUsername = document.getElementById("record-patient").value;
    if (patientUsername in medicalRecords) {
        showRecords(patientUsername);
    } else {
        alert("No records found for this patient.");
    }
});
