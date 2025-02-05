let addressId = "";
const token = localStorage.getItem("token");

document.addEventListener("DOMContentLoaded", async function () {
  if (!token) {
    alert("¡Debes iniciar sesion primero!");
    window.location.href = "../authentication/sign-in.html";
    return;
  }

  const response = await fetch("http://localhost:3000/address/get", {
    headers: {
      "x-auth-token": token,
    },
  });
  if (response.status === 200) {
    const address = await response.json();
    document.getElementById("street").value = address.street;
    document.getElementById("city").value = address.city;
    document.getElementById("province").value = address.province;
    document.getElementById("zip").value = address.zipCode;
    document.getElementById("number").value = address.number;
    addressId = address.id;

    document.getElementById("editButton").style.display = "inline-block";
    document.getElementById("deleteButton").style.display = "inline-block";
  } else {
    document.getElementById("saveButton").style.display = "inline-block";
  }
});

document.getElementById("saveButton").addEventListener("click", function () {
  const address = {
    street: document.getElementById("street").value,
    city: document.getElementById("city").value,
    province: document.getElementById("province").value,
    zipCode: document.getElementById("zip").value,
    number: document.getElementById("number").value,
  };

  fetch("http://localhost:3000/address/add", {
    method: "POST",
    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(address),
  })
    .then((response) => response.json())
    .then((data) => {
      location.reload();
    })
    .catch((error) => {
      console.error("Error al guardar la dirección:", error);
    });
});

document.getElementById("editButton").addEventListener("click", function () {
  const address = {
    id: addressId,
    street: document.getElementById("street").value,
    city: document.getElementById("city").value,
    province: document.getElementById("province").value,
    zipCode: document.getElementById("zip").value,
    number: document.getElementById("number").value,
  };

  fetch("http://localhost:3000/address/update", {
    method: "PUT",
    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(address),
  })
    .then((response) => response.json())
    .then((data) => {
      location.reload();
    })
    .catch((error) => {
      console.error("Error al actualizar la dirección:", error);
    });
});

document.getElementById("deleteButton").addEventListener("click", function () {
  fetch(`http://localhost:3000/address/delete/${addressId}`, {
    method: "DELETE",
    headers: {
      "x-auth-token": token,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      location.reload();
    })
    .catch((error) => {
      console.error("Error al eliminar la dirección:", error);
    });
});
