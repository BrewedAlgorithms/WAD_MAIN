const patterns = {
    uName: /^[A-Za-z ]+$/,
    mob: /^[6-9]\d{9}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    pass: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
    addr: /.{5,}/
};

const dobInput = document.getElementById("dob");
const dobError = document.getElementById("dobE");

// Set max date to today
const today = new Date();
dobInput.max = today.toISOString().split("T")[0];

// Validate on change
dobInput.addEventListener("change", function () {
    const selectedDate = new Date(this.value);

    if (selectedDate > today) {
        dobError.textContent = "Date of birth cannot be in the future.";
        this.value = "";
    } else {
        dobError.textContent = "";
    }
});


showP.onchange = () => {
    pass.type = showP.checked ? "text" : "password";
};
// Toggle Other Hobby
othC.onchange = () => othT.style.display = othC.checked ? "block" : "none";

// One helper to rule them all
function validate(id, regex, errId, msg) {
    let el = document.getElementById(id);
    let ok = regex.test(el.value.trim());
    document.getElementById(errId).innerText = ok ? "" : msg;
    el.style.borderColor = ok ? "#e2e8f0" : "#ef4444";
    return ok;
}

// On Blur triggers
uName.onblur = () => validate("uName", patterns.uName, "uNameE", "Alphabets & space only");
mob.onblur = () => validate("mob", patterns.mob, "mobE", "10 digits starting with 6-9");
email.onblur = () => validate("email", patterns.email, "emailE", "Invalid email format");
pass.onblur = () => validate("pass", patterns.pass, "passE", "Must be strong (8+ chars)");
addr.onblur = () => validate("addr", patterns.addr, "addrE", "Address is too short");

regForm.onsubmit = async (e) => {
    e.preventDefault();

    let valid = validate("uName", patterns.uName, "uNameE", "Required") &&
                validate("mob", patterns.mob, "mobE", "Required") &&
                validate("email", patterns.email, "emailE", "Required") &&
                validate("pass", patterns.pass, "passE", "Required") &&
                validate("addr", patterns.addr, "addrE", "Required");

    let gender = document.querySelector("input[name='gen']:checked");
    genE.innerText = gender ? "" : "Please select gender";

    if (valid && gender && city.value && dob.value) {
        let hobbies = [...document.querySelectorAll(".hb:checked")].map(h => h.value);
        if(othC.checked) hobbies.push(othT.value);

        let data = { 
    name: uName.value, 
    mobile: mob.value, 
    email: email.value, 
    address: addr.value, 
    dob: dob.value,      
    city: city.value,
    gender: gender.value,
    hobbies: hobbies
};



        // // AJAX Method
        // await fetch('https://jsonplaceholder.typicode.com/posts', {
        //     method: 'POST',
        //     body: JSON.stringify(data)
        // });

        localStorage.setItem("user", JSON.stringify(data));
        window.location.href = "display.html";
    }
};