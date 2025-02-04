import { addToCart } from "../service/productService.js";

function loadBeverage() {
  const products = JSON.parse(localStorage.getItem("products"));
  const title = document.getElementById("TITLE");

  const beverageProducts = products.filter((product) =>
    product.type.includes("BEBIDA")
  );
  for (let i = 0; i < beverageProducts.length; i++) {
    const beverageDiv = document.createElement("div");
    beverageDiv.className = "menu-dulces";
    const productImg = document.createElement("img");
    productImg.src =
      "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D";
    productImg.className = "food-image";
    productImg.id = "avocado-toast";
    const productDiv = document.createElement("div");
    productDiv.className = "producto";
    const productName = document.createElement("p");
    productName.className = "nombre";
    productName.innerText = beverageProducts[i].name;
    const productDescription = document.createElement("p");
    productDescription.className = "descripcion";
    productDescription.innerText = beverageProducts[i].description;
    const productPrice = document.createElement("p");
    productPrice.className = "precio";
    productPrice.innerText = beverageProducts[i].value;
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
