import { addToCart } from "../service/productService.js";
import { API_URL } from "../config.js";

function loadAll() {
  const products = JSON.parse(localStorage.getItem("products"));
  const allDivs = document.getElementById("productos");
  for (let i = 0; i < products.length; i++) {
    const allDiv = document.createElement("div");
    allDiv.className = "menu-dulces";
    const productImg = document.createElement("img");
    productImg.src = `${API_URL}${products[i].image}`;
    productImg.className = "food-image";
    const productDiv = document.createElement("div");
    productDiv.className = "producto";
    const productName = document.createElement("p");
    productName.className = "nombre";
    productName.innerText = products[i].name;
    const productDescription = document.createElement("p");
    productDescription.className = "descripcion";
    productDescription.innerText = products[i].description + ". " + products[i].calories + " kcal";
    const productPrice = document.createElement("p");
    productPrice.className = "precio";
    productPrice.innerText = "$" + products[i].value;
    productDiv.appendChild(productName);
    productDiv.appendChild(productDescription);
    productDiv.appendChild(productPrice);
    const addToCartButton = document.createElement("button");
    addToCartButton.innerText = "AGREGAR AL CARRITO";
    addToCartButton.className = "cart-button"
    addToCartButton.addEventListener("click", () =>
      addToCart(products, i)
    );
    productDiv.appendChild(addToCartButton);
    allDivs.append(allDiv);
    allDiv.appendChild(productImg);
    allDiv.appendChild(productDiv);
  }
}

loadAll();
