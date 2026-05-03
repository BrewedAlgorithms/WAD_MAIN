const usernameField = document.getElementById("username");

const passwordField = document.getElementById("password");

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault(); 

  let username = usernameField.value;

  let password = passwordField.value;

  const xhr = new XMLHttpRequest();

  xhr.open("POST", "/login", true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onload = function () {
    if (xhr.status === 200) {
      window.location.href = "data.html";
    } else {
      alert("Invalid Login");
    }
  };

  xhr.onerror = function () {
    alert("Server not running (start server.js)");
  };

  xhr.send(
    JSON.stringify({
      email: username,
      password: password,
    }),
  );
});
