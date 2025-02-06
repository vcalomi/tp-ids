import { API_URL } from "../config.js";

document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  const editForm = document.getElementById("edit-product-form");

  async function loadProduct() {
    try {
      const response = await fetch(`${API_URL}/products/${productId}`);
      const product = await response.json();

      document.getElementById("edit-product-name").value = product.name;
      document.getElementById("edit-product-price").value = product.value;
      // document.getElementById("edit-product-image").value = product.image; // Esto es solo para mostrar la imagen actual
      document.getElementById("edit-product-description").value =
        product.description;
      document.getElementById("edit-product-type").value =
        product.type.join(", ");
      document.getElementById("edit-product-calories").value = product.calories;
    } catch (error) {
      console.error("Error al cargar el producto:", error);
    }
  }

  editForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", document.getElementById("edit-product-name").value);
    formData.append(
      "value",
      parseFloat(document.getElementById("edit-product-price").value)
    );
    formData.append(
      "description",
      document.getElementById("edit-product-description").value
    );
    formData.append(
      "type",
      document
        .getElementById("edit-product-type")
        .value.split(",")
        .map((t) => t.trim())
    );
    formData.append(
      "calories",
      parseInt(document.getElementById("edit-product-calories").value)
    );

    const imageFile = document.getElementById("edit-product-image").files[0];
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await fetch(`${API_URL}/products/edit/${productId}`, {
        method: "PUT",
        headers: {
          "x-auth-token": token,
        },
        body: formData,
      });

      if (response.ok) {
        alert("Producto actualizado con éxito.");
        window.location.href = "./manage-products.html";
      } else {
        alert("Ha ocurrido un error al actualizar el producto.");
      }
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  });

  loadProduct();
});
