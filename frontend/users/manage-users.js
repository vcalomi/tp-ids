import { API_URL } from "../config.js";

function renderUsers(users) {
  const userList = document.querySelector(".user-list");

  users.forEach((user) => {
    const userItem = document.createElement("div");
    userItem.classList.add("user-item");

    const userInfo = document.createElement("p");
    userInfo.textContent = `Nombre de usuario: ${user.username} - Rol: ${user.role}`;

    const toggleButton = document.createElement("button");
    toggleButton.textContent =
      user.role === "ADMIN" ? "Quitar Admin" : "Hacer Admin";
    toggleButton.addEventListener("click", () => toggleAdmin(users, user.id));

    userItem.appendChild(userInfo);
    userItem.appendChild(toggleButton);
    userList.appendChild(userItem);
  });
}

function toggleAdmin(users, userId) {
  const user = users.find((u) => u.id === userId);
  if (user) {
    console.log("CLICK");

    renderUsers();
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/auth/users`, {
    method: "GET",
    headers: {
      "x-auth-token": token,
    },
  });

  if (!response.ok) {
    alert("No se ha podido cargar los usuarios");
    return;
  }
  const users = await response.json();
  console.log(users);
  renderUsers(users);
});
