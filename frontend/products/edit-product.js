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
      document.getElementById("edit-product-description").value =
        product.description;
      document.getElementById("product-type").value = product.type[0];
      document.getElementById("edit-product-calories").value = product.calories;
      document.getElementById("product-status").value = product.status;
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
    formData.append("type", document.getElementById("product-type").value);
    formData.append(
      "calories",
      parseInt(document.getElementById("edit-product-calories").value)
    );
    formData.append("status", document.getElementById("product-status").value);

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
