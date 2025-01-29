//hamburger button menu
document.addEventListener("DOMContentLoaded", function () {
  const hamburgerButton = document.getElementById("hamburger-button");
  const dropdownMenu = document.getElementById("dropdown-menu");

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

document.addEventListener("DOMContentLoaded", () => {
  const possibleCart = localStorage.getItem("carrito");
  let cart = [];
  if (possibleCart) {
    return;
  } else {
    localStorage.setItem("carrito", JSON.parse(cart));
  }
});
