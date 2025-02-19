import { addToCart } from "../service/productService.js";

function loadSalty() {
  const products = JSON.parse(localStorage.getItem("products"));
  const saltyDivs = document.getElementById("productos");

  const saltyProducts = products.filter((product) =>
    product.type.includes("SALADO")
  );

  const productsToShow = saltyProducts.filter(
    (product) => product.status === "ACTIVE"
  );

  for (let i = 0; i < productsToShow.length; i++) {
    const saltyDiv = document.createElement("div");
    saltyDiv.className = "menu-dulces";
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
    addToCartButton.className = "cart-button";
    addToCartButton.innerText = "AGREGAR AL CARRITO";
    addToCartButton.addEventListener("click", () =>
      addToCart(productsToShow, i)
    );
    productDiv.appendChild(addToCartButton);
    saltyDivs.append(saltyDiv);
    saltyDiv.appendChild(productImg);
    saltyDiv.appendChild(productDiv);
  }
}

loadSalty();
