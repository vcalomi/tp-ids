import { API_URL } from "../config.js";

async function fetchProducts() {
  const response = await fetch(`${API_URL}/products/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const products = response.json();
  return products;
}

fetchProducts().then((data) =>
  localStorage.setItem("products", JSON.stringify(data))
);

export function addToCart(products, index) {
  let cart = JSON.parse(localStorage.getItem("carrito")) || [];
  console.log(cart);
  
  const existingProduct = cart.find(
    (product) => product.id === products[index].id
  );
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({
      id: products[index].id,
      name: products[index].name,
      value: products[index].value,
      quantity: 1,
    });
  }
  localStorage.setItem("carrito", JSON.stringify(cart));
}
