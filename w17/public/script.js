fetch("/employees")
.then(response => response.json())
.then(data => {

    const container = document.getElementById("employee-container");

    data.forEach(emp => {

        container.innerHTML += `
            <div class="card">
                <img src="${emp.image}" width="150">
                <h2>${emp.name}</h2>
                <p><b>Designation:</b> ${emp.designation}</p>
                <p><b>Department:</b> ${emp.department}</p>
                <p><b>Salary:</b> ₹${emp.salary}</p>
            </div>
        `;
    });
});