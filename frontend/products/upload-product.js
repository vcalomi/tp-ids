import { API_URL } from "../config.js";

document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");
  const uploadForm = document.getElementById("upload-product-form");

  uploadForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", document.getElementById("product-name").value);
    formData.append(
      "value",
      parseFloat(document.getElementById("product-value").value)
    );
    formData.append("image", document.getElementById("product-image").files[0]);
    formData.append(
      "description",
      document.getElementById("product-description").value
    );
    formData.append("type", document.getElementById("product-type").value);
    formData.append(
      "calories",
      parseInt(document.getElementById("product-calories").value)
    );

    try {
      const response = await fetch(`${API_URL}/products/create`, {
        method: "POST",
        headers: {
          "x-auth-token": token,
        },
        body: formData,
      });

      if (response.status === 201) {
        alert("Producto subido con éxito.");
        window.location.href = "../index.html";
      } else {
        alert("Ha ocurrido un error");
      }
    } catch (error) {
      console.error("Error al subir el producto:", error);
    }
  });
});
