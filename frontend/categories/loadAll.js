import { addToCart } from "../service/productService.js";

function loadBeverage() {
  const products = JSON.parse(localStorage.getItem("products"));
  const title = document.getElementById("TITLE");

  for (let i = 0; i < products.length; i++) {
    const beverageDiv = document.createElement("div");
    beverageDiv.className = "menu-dulces";
    const productImg = document.createElement("img");
    productImg.src = "../images/brownie.png";
    productImg.className = "food-image";
    productImg.id = "avocado-toast";
    const productDiv = document.createElement("div");
    productDiv.className = "producto";
    const productName = document.createElement("p");
    productName.className = "nombre";
    productName.innerText = products[i].name;
    const productDescription = document.createElement("p");
    productDescription.className = "descripcion";
    productDescription.innerText = products[i].description;
    const productPrice = document.createElement("p");
    productPrice.className = "precio";
    productPrice.innerText = products[i].value;
    productDiv.appendChild(productName);
    productDiv.appendChild(productDescription);
    productDiv.appendChild(productPrice);
    const addToCartButton = document.createElement("button");
    addToCartButton.innerText = "Agregar al carrito";
    addToCartButton.addEventListener("click", () =>
      addToCart(beverageProducts, i)
    );
    productDiv.appendChild(addToCartButton);
    title.append(beverageDiv);
    beverageDiv.appendChild(productImg);
    beverageDiv.appendChild(productDiv);
  }
}

loadBeverage();
