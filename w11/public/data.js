let table = document.getElementById("tableData");

const xhr = new XMLHttpRequest();

xhr.open("GET", "/users", true);

xhr.onload = function () {
  if (xhr.status === 200) {
    const users = JSON.parse(xhr.responseText);

    users.forEach((u) => {
      table.innerHTML += `
    
    <tr>

        <td>${u.name}</td>

        <td>${u.email}</td>

        <td>${u.mobile}</td>

        <td>${u.dob}</td>

        <td>${u.city}</td>

        <td>${u.address}</td>

    </tr>

    `;
    });
  }
};

xhr.onerror = function () {
  table.innerHTML =
    "<tr><td colspan='6'>Server not running (start server.js)</td></tr>";
};

xhr.send();
