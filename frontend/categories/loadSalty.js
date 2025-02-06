import { addToCart } from "../service/productService.js";

function loadSalty() {
  const products = JSON.parse(localStorage.getItem("products"));
  const saltyDivs = document.getElementById("productos");

  const saltyProducts = products.filter((product) =>
    product.type.includes("SALADO")
  );
  for (let i = 0; i < saltyProducts.length; i++) {
    const saltyDiv = document.createElement("div");
    saltyDiv.className = "menu-dulces";
    const productImg = document.createElement("img");
    productImg.src =
      "../images/croissant.png";
    productImg.className = "food-image";
    const productDiv = document.createElement("div");
    productDiv.className = "producto";
    const productName = document.createElement("p");
    productName.className = "nombre";
    productName.innerText = saltyProducts[i].name;
    const productDescription = document.createElement("p");
    productDescription.className = "descripcion";
    productDescription.innerText = saltyProducts[i].description + " Calorias: " + saltyProducts[i].calories
    const productPrice = document.createElement("p");
    productPrice.className = "precio";
    productPrice.innerText = saltyProducts[i].value;
    productDiv.appendChild(productName);
    productDiv.appendChild(productDescription);
    productDiv.appendChild(productPrice);
    const addToCartButton = document.createElement("button");
    addToCartButton.className = "cart-button"
    addToCartButton.innerText = "Agregar al carrito";
    addToCartButton.addEventListener("click", () =>
      addToCart(saltyProducts, i)
    );
    productDiv.appendChild(addToCartButton);
    saltyDivs.append(saltyDiv);
    saltyDiv.appendChild(productImg);
    saltyDiv.appendChild(productDiv);
  }
}

loadSalty();
