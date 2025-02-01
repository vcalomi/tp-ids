document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  const editForm = document.getElementById("edit-product-form");

  async function loadProduct() {
    try {
      const response = await fetch(
        `http://localhost:3000/products/${productId}`
      );
      const product = await response.json();

      document.getElementById("edit-product-name").value = product.name;
      document.getElementById("edit-product-price").value = product.value;
      document.getElementById("edit-product-image").value = product.image;
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

    const productData = {
      name: document.getElementById("edit-product-name").value,
      value: parseFloat(document.getElementById("edit-product-price").value),
      image: document.getElementById("edit-product-image").value,
      description: document.getElementById("edit-product-description").value,
      type: document
        .getElementById("edit-product-type")
        .value.split(",")
        .map((t) => t.trim()),
      calories: parseInt(
        document.getElementById("edit-product-calories").value
      ),
    };

    try {
      const response = await fetch(
        `http://localhost:3000/products/edit/${productId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData),
        }
      );
      alert("Producto actualizado con éxito.");
      window.location.href = "./delete-product.html";
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  });

  loadProduct();
});
