const baseURL = "http://localhost:3000/products/";

async function fetchProducts() {
  const response = await fetch(baseURL, {
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
  if (localStorage.getItem("carrito").length === 0) {
    const cart = [];
    cart.push({
      id: 1,
      name: products[index].name,
      value: products[index].value,
      quantity: 1,
    });
    localStorage.setItem("carrito", JSON.stringify(cart));
  } else {
    const cart = JSON.parse(localStorage.getItem("carrito"));
    cart.push({
      id: 1,
      name: products[index].name,
      value: products[index].value,
      quantity: 1,
    });
  }
}
