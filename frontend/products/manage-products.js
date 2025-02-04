document.addEventListener("DOMContentLoaded", function () {
  const productList = document.getElementById("product-list");
  async function fetchProducts() {
    try {
      const response = await fetch("http://localhost:3000/products");
      const products = await response.json();
      displayProducts(products);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  }

  function displayProducts(products) {
    productList.innerHTML = "";

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
        <div class="product-actions">
          <button class="edit-button" data-id="${product.id}">Editar</button>
          <button class="delete-button" data-id="${
            product.id
          }">Eliminar</button>
        </div>
      `;
      productList.appendChild(productItem);
    });

    const deleteButtons = document.querySelectorAll(".delete-button");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", async function () {
        const productId = button.getAttribute("data-id");
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

    const editButtons = document.querySelectorAll(".edit-button");
    editButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const productId = button.getAttribute("data-id");
        window.location.href = `edit-product.html?id=${productId}`;
      });
    });
  }

  fetchProducts();
});
