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

async function toggleAdmin(users, userId) {
  const token = localStorage.getItem("token");
  const user = users.find((u) => u.id === userId);
  if (user) {
    let newRole = "ADMIN";
    if (user.role === "ADMIN") {
      newRole = "USER";
    }
    console.log(newRole);

    const response = await fetch(`${API_URL}/auth/users/role/${user.id}`, {
      method: "PUT",
      headers: {
        "x-auth-token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role: newRole }),
    });

    if (!response.ok) {
      alert("Hubo un error al actualizar el rol");
      return;
    }

    alert("Actualizado correctamente");
    window.location.href = "./manage-users.html";
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
