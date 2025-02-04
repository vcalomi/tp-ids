document.addEventListener("DOMContentLoaded", () => {
  const possibleCart = localStorage.getItem("carrito");
  let cart = [];
  if (possibleCart) {
    return;
  } else {
    localStorage.setItem("carrito", JSON.stringify(cart));
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const possibleUser = localStorage.getItem("user");
  let user = null;
  if (possibleUser) {
    return;
  } else {
    localStorage.setItem("carrito", JSON.stringify(user));
  }
});
