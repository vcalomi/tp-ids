//hamburger button menu
document.addEventListener("DOMContentLoaded", function () {
  const hamburgerButton = document.getElementById("hamburger-button");
  const dropdownMenu = document.getElementById("dropdown-menu");
  const optionList = document.createElement("ul");
  dropdownMenu.appendChild(optionList);
  //const user = JSON.parse(localStorage.getItem("user"));
  const user = {
    role: "",
  };
  if (user && user.role === "ADMIN") {
    [
      { title: "Carrito", link: "./cart.html" },
      { title: "Subir Producto", link: "./upload-product.html" },
      { title: "Administrar Productos", link: "./manage-products.html" },
      { title: "Administrar Ordenes", link: "./manage-orders.html" },
    ].map(({ title, url }) => {
      const option = document.createElement("li");
      const link = document.createElement("a");

      link.href = url;
      link.innerText = title;
      option.appendChild(link);
      optionList.appendChild(option);
    });
  } else if (user) {
    [
      { title: "Carrito", link: "./cart.html" },
      { title: "Administrar Direccion", link: "./upload-product.html" },
      { title: "Administrar Ordenes", link: "./manage-orders.html" },
    ].map(({ title, url }) => {
      const option = document.createElement("li");
      const link = document.createElement("a");

      link.href = url;
      link.innerText = title;
      option.appendChild(link);
      optionList.appendChild(option);
    });
  } else {
    [
      { title: "Registrarse", link: "./sign-up.html" },
      { title: "Iniciar sesion", link: "./sign-in.html" },
    ].map(({ title, url }) => {
      const option = document.createElement("li");
      const link = document.createElement("a");

      link.href = url;
      link.innerText = title;
      option.appendChild(link);
      optionList.appendChild(option);
    });
  }

  hamburgerButton.addEventListener("click", function () {
    dropdownMenu.classList.toggle("active");
  });

  document.addEventListener("click", function (event) {
    if (
      !hamburgerButton.contains(event.target) &&
      !dropdownMenu.contains(event.target)
    ) {
      dropdownMenu.classList.remove("active");
    }
  });
});

function getPayloadFromToken(token) {
  try {
    const [header, payload, signature] = token.split(".");
    const decodedPayload = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decodedPayload);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}
