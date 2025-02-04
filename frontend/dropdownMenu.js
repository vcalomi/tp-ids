//hamburger button menu
document.addEventListener("DOMContentLoaded", function () {
  const hamburgerButton = document.getElementById("hamburger-button");
  const dropdownMenu = document.getElementById("dropdown-menu");
  const optionList = document.createElement("ul");
  dropdownMenu.appendChild(optionList);
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.role === "ADMIN") {
    [
      { title: "Carrito", url: "./cart/cart.html" },
      { title: "Subir Producto", url: "./products/upload-product.html" },
      {
        title: "Administrar Productos",
        url: "./products/manage-products.html",
      },
      { title: "Administrar Ordenes", url: "./orders/manage-orders.html" },
      { title: "Cerrar sesion", url: "./authentication/logout.html" },
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
      { title: "Carrito", url: "./cart/cart.html" },
      { title: "Administrar Direccion", url: "./address/manage-address.html" },
      { title: "Administrar Ordenes", url: "./orders/manage-user-orders.html" },
      { title: "Cerrar sesion", url: "./authentication/logout.html" },
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
      { title: "Registrarse", url: "./authentication/sign-up.html" },
      { title: "Iniciar sesion", url: "./authentication/sign-in.html" },
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
