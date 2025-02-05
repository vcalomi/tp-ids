function logout() {
  localStorage.setItem("user", null);
  localStorage.setItem("carrito", JSON.stringify([]));
  window.location.href = "../index.html";
}

logout();
