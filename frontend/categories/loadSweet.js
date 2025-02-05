import { addToCart } from "../service/productService.js";

function loadSweet() {
  const products = JSON.parse(localStorage.getItem("products"));
  const title = document.getElementById("TITLE");
  const sweetProducts = products.filter((product) =>
    product.type.includes("DULCE")
  );

  for (let i = 0; i < sweetProducts.length; i++) {
    const sweetDiv = document.createElement("div");
    sweetDiv.className = "menu-dulces";
    const productImg = document.createElement("img");
    productImg.src =
      "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D";
    productImg.className = "food-image";
    productImg.id = "avocado-toast";
    const productDiv = document.createElement("div");
    productDiv.className = "producto";
    const productName = document.createElement("p");
    productName.className = "nombre";
    productName.innerText = sweetProducts[i].name;
    const productDescription = document.createElement("p");
    productDescription.className = "descripcion";
    productDescription.innerText = sweetProducts[i].description;
    const productPrice = document.createElement("p");
    productPrice.className = "precio";
    productPrice.innerText = sweetProducts[i].value;
    productDiv.appendChild(productName);
    productDiv.appendChild(productDescription);
    productDiv.appendChild(productPrice);
    const addToCartButton = document.createElement("button");
    addToCartButton.innerText = "Agregar al carrito";
    addToCartButton.addEventListener("click", () =>
      addToCart(sweetProducts, i)
    );
    productDiv.appendChild(addToCartButton);
    title.append(sweetDiv);
    sweetDiv.appendChild(productImg);
    sweetDiv.appendChild(productDiv);
  }
}

loadSweet();
