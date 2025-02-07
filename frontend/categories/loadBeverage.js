import { API_URL } from "../config.js";
import { addToCart } from "../service/productService.js";

function loadBeverage() {
  const products = JSON.parse(localStorage.getItem("products"));
  const beverageDivs = document.getElementById("productos");

  const beverageProducts = products.filter((product) =>
    product.type.includes("BEBIDA")
  );
  for (let i = 0; i < beverageProducts.length; i++) {
    const beverageDiv = document.createElement("div");
    beverageDiv.className = "menu-dulces";
    const productImg = document.createElement("img");
    productImg.src = `${API_URL}${beverageProducts[i].image}`;
    productImg.className = "food-image";
    const productDiv = document.createElement("div");
    productDiv.className = "producto";
    const productName = document.createElement("p");
    productName.className = "nombre";
    productName.innerText = beverageProducts[i].name;
    const productDescription = document.createElement("p");
    productDescription.className = "descripcion";
    productDescription.innerText = beverageProducts[i].description + ". " + beverageProducts[i].calories + " kcal"
    const productPrice = document.createElement("p");
    productPrice.className = "precio";
    productPrice.innerText = "$" + beverageProducts[i].value;
    productDiv.appendChild(productName);
    productDiv.appendChild(productDescription);
    productDiv.appendChild(productPrice);
    const addToCartButton = document.createElement("button");
    addToCartButton.className = "cart-button"
    addToCartButton.innerText = "AGREGAR AL CARRITO";
    addToCartButton.addEventListener("click", () =>
      addToCart(beverageProducts, i)
    );
    productDiv.appendChild(addToCartButton);
    beverageDivs.append(beverageDiv);
    beverageDiv.appendChild(productImg);
    beverageDiv.appendChild(productDiv);
  }
}

loadBeverage();
