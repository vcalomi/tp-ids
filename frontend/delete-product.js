document.addEventListener("DOMContentLoaded", function () {
  const productList = document.getElementById("product-list");

  // Función para obtener los productos del backend
  async function fetchProducts() {
    try {
      const response = await fetch("http://localhost:3000/products");
      const products = await response.json();
      displayProducts(products);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  }

  // Función para mostrar los productos en la página
  function displayProducts(products) {
    productList.innerHTML = ""; // Limpiar la lista antes de agregar productos

    products.forEach((product) => {
      const productItem = document.createElement("div");
      productItem.className = "product-item";
      productItem.innerHTML = `
        <img src="${product.image}" alt="${
        product.name
      }" class="product-image" />
        <div class="product-details">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <p>Precio: $${product.value}</p>
          <p>Tipo: ${product.type.join(", ")}</p>
          <p>Calorías: ${product.calories}</p>
        </div>
        <button class="delete-button" data-id="${product.id}">Eliminar</button>
      `;
      productList.appendChild(productItem);
    });

    // Agregar evento a los botones de eliminar
    const deleteButtons = document.querySelectorAll(".delete-button");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", async function () {
        const productId = button.getAttribute("data-id");
        console.log(productId);

        try {
          const response = await fetch(
            `http://localhost:3000/products/delete/${productId}`,
            {
              method: "DELETE",
            }
          );
          alert("Producto eliminado con éxito.");
          fetchProducts();
        } catch (error) {
          console.error("Error al eliminar el producto:", error);
        }
      });
    });
  }

  fetchProducts();
});
