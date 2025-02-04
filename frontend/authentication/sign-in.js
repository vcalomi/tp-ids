import { getPayloadFromToken } from "./tokenDecoder.js";

document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          const token = data.token;
          const decodedToken = getPayloadFromToken(token);
          const user = decodedToken.user;
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          window.location.href = "../index.html";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
