import { getPayloadFromToken } from "./tokenDecoder.js";
import { API_URL } from "../config.js";

document
  .getElementById("registerForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    if (response.status === 400) {
      alert("Usuario existente!");
      return;
    }
    const data = await response.json();
    if (data.token) {
      const token = data.token;
      const decodedToken = getPayloadFromToken(token);
      const user = decodedToken.user;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      window.location.href = "../index.html";
    }
  });
