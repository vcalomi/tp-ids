function loadSalty() {
  const products = JSON.parse(localStorage.getItem("products"));
  const title = document.getElementById("TITLE");
  console.log(products);

  const saltyProducts = products.filter((product) =>
    product.type.includes("SALADO")
  );
  for (let i = 0; i < saltyProducts.length; i++) {
    const saltyDiv = document.createElement("div");
    saltyDiv.className = "menu-dulces";
    const productImg = document.createElement("img");
    productImg.src =
      "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D";
    productImg.className = "food-image";
    productImg.id = "avocado-toast";
    const productDiv = document.createElement("div");
    productDiv.className = "producto";
    const productName = document.createElement("p");
    productName.className = "nombre";
    productName.innerText = saltyProducts[i].name;
    const productDescription = document.createElement("p");
    productDescription.className = "descripcion";
    productDescription.innerText = saltyProducts[i].description;
    const productPrice = document.createElement("p");
    productPrice.className = "precio";
    productPrice.innerText = saltyProducts[i].value;
    productDiv.appendChild(productName);
    productDiv.appendChild(productDescription);
    productDiv.appendChild(productPrice);
    const addToCartButton = document.createElement("button");
    addToCartButton.innerText = "Agregar al carrito";
    addToCartButton.addEventListener("click", () => {
      if (localStorage.getItem("carrito").length === 0) {
        const cart = [];
        cart.push({
          id: 1,
          name: saltyProducts[i].name,
          value: saltyProducts[i].value,
          quantity: 1,
        });
        localStorage.setItem("carrito", JSON.stringify(cart));
      } else {
        console.log(localStorage.getItem("carrito"));

        const cart = JSON.parse(localStorage.getItem("carrito"));
        cart.push({
          id: 1,
          name: saltyProducts[i].name,
          value: saltyProducts[i].value,
          quantity: 1,
        });
      }
    });
    productDiv.appendChild(addToCartButton);
    title.append(saltyDiv);
    saltyDiv.appendChild(productImg);
    saltyDiv.appendChild(productDiv);
  }
}

loadSalty();
