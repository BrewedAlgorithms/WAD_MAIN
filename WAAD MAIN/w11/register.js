const nameField = document.getElementById("name");
const emailField = document.getElementById("email");
const passwordField = document.getElementById("password");
const mobileField = document.getElementById("mobile");
const dobField = document.getElementById("dob");
const cityField = document.getElementById("city");
const addressField = document.getElementById("address");
const msg = document.getElementById("msg");

document.getElementById("registerForm")
.addEventListener("submit", function(e){

    e.preventDefault();

    let name = nameField.value;
    let email = emailField.value;
    let password = passwordField.value;
    let mobile = mobileField.value;
    let dob = dobField.value;
    let city = cityField.value;
    let address = addressField.value;

    if(!/^[A-Z][a-zA-Z ]*$/.test(name))
        return alert("Name must start with capital letter");

if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        return alert("Invalid Email");

    if(password.length < 8)
        return alert("Password must be at least 8 characters");

    if(!/[A-Z]/.test(password))
        return alert("Password must contain at least one uppercase letter");

    if(!/[a-z]/.test(password))
        return alert("Password must contain at least one lowercase letter");

    if(!/[0-9]/.test(password))
        return alert("Password must contain at least one number");

    if(!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password))
        return alert("Password must contain at least one special character");

    if(!/^[0-9]{10}$/.test(mobile))
        return alert("Mobile must be 10 digits");

    if(dob === "")
        return alert("Select DOB");

    if(city === "")
        return alert("Select City");

    if(address.trim() === "")
        return alert("Enter Address");

    let user = {
        name,
        email,
        password,
        mobile,
        dob,
        city,
        address
    };

    const xhr = new XMLHttpRequest();

    xhr.open("POST", "/register", true);

    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {

        if (xhr.status === 201) {

            msg.innerText = "Registration Successful";
            document.getElementById("registerForm").reset();

        } else if (xhr.status === 409) {

            alert("User already exists");

        } else {

            alert("Registration failed");

        }
    };

    xhr.onerror = function () {
        alert("Server not running (start server.js)");
    };

    xhr.send(JSON.stringify(user));

});