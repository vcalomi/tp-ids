import { addToCart } from "../service/productService.js";

function loadAll() {
  const products = JSON.parse(localStorage.getItem("products"));
  const allDivs = document.getElementById("productos");
  const productsToShow = products.filter(
    (product) => product.status === "ACTIVE"
  );

  for (let i = 0; i < productsToShow.length; i++) {
    const allDiv = document.createElement("div");
    allDiv.className = "menu-dulces";
    const productImg = document.createElement("img");
    productImg.src = `${productsToShow[i].image}`;
    productImg.className = "food-image";
    const productDiv = document.createElement("div");
    productDiv.className = "producto";
    const productName = document.createElement("p");
    productName.className = "nombre";
    productName.innerText = productsToShow[i].name;
    const productDescription = document.createElement("p");
    productDescription.className = "descripcion";
    productDescription.innerText =
      productsToShow[i].description +
      ". " +
      productsToShow[i].calories +
      " kcal";
    const productPrice = document.createElement("p");
    productPrice.className = "precio";
    productPrice.innerText = "$" + productsToShow[i].value;
    productDiv.appendChild(productName);
    productDiv.appendChild(productDescription);
    productDiv.appendChild(productPrice);
    const addToCartButton = document.createElement("button");
    addToCartButton.innerText = "AGREGAR AL CARRITO";
    addToCartButton.className = "cart-button";
    addToCartButton.addEventListener("click", () =>
      addToCart(productsToShow, i)
    );
    productDiv.appendChild(addToCartButton);
    allDivs.append(allDiv);
    allDiv.appendChild(productImg);
    allDiv.appendChild(productDiv);
  }
}

loadAll();
