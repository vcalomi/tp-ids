import { addToCart } from "../service/productService.js";

function loadSweet() {
  const products = JSON.parse(localStorage.getItem("products"));
  const sweetDivs = document.getElementById("productos");
  const sweetProducts = products.filter((product) =>
    product.type.includes("DULCE")
  );

  for (let i = 0; i < sweetProducts.length; i++) {
    const sweetDiv = document.createElement("div");
    sweetDiv.className = "menu-dulces";
    const productImg = document.createElement("img");
    productImg.src = `${sweetProducts[i].image}`;
    productImg.className = "food-image";
    const productDiv = document.createElement("div");
    productDiv.className = "producto";
    const productName = document.createElement("p");
    productName.className = "nombre";
    productName.innerText = sweetProducts[i].name;
    const productDescription = document.createElement("p");
    productDescription.className = "descripcion";
    productDescription.innerText =
      sweetProducts[i].description + ". " + sweetProducts[i].calories + " kcal";
    const productPrice = document.createElement("p");
    productPrice.className = "precio";
    productPrice.innerText = "$" + sweetProducts[i].value;
    productDiv.appendChild(productName);
    productDiv.appendChild(productDescription);
    productDiv.appendChild(productPrice);
    const addToCartButton = document.createElement("button");
    addToCartButton.className = "cart-button"
    addToCartButton.innerText = "AGREGAR AL CARRITO";
    addToCartButton.addEventListener("click", () =>
      addToCart(sweetProducts, i)
    );
    productDiv.appendChild(addToCartButton);
    sweetDivs.append(sweetDiv);
    sweetDiv.appendChild(productImg);
    sweetDiv.appendChild(productDiv);
  }
}

loadSweet();
