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
