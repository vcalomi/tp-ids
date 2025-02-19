import { API_URL } from "../config.js";

document.addEventListener("DOMContentLoaded", function () {
  let cartItems = JSON.parse(localStorage.getItem("carrito")) || [];

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const token = localStorage.getItem("token") || "";
  const cartItemsContainer = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");
  const placeOrderButton = document.getElementById("place-order");

  function loadCartItems() {
    cartItemsContainer.innerHTML = "";
    let totalPrice = 0;

    cartItems.forEach((item, index) => {
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}" />
        <span>${item.name}</span>
        <span>Precio: $${item.value * item.quantity}</span>
        <div class="quantity-controls">
          <button class="decrease-btn" data-index="${index}">-</button>
          <span>${item.quantity}</span>
          <button class="increase-btn" data-index="${index}">+</button>
        </div>
      `;

      cartItemsContainer.appendChild(cartItem);
      totalPrice += item.value * item.quantity;
    });

    totalPriceElement.textContent = totalPrice.toFixed(2);

    document.querySelectorAll(".increase-btn").forEach((button) => {
      button.addEventListener("click", function () {
        updateQuantity(this.dataset.index, 1);
      });
    });

    document.querySelectorAll(".decrease-btn").forEach((button) => {
      button.addEventListener("click", function () {
        updateQuantity(this.dataset.index, -1);
      });
    });
  }

  function updateQuantity(index, change) {
    cartItems[index].quantity += change;

    if (cartItems[index].quantity <= 0) {
      cartItems.splice(index, 1);
    }

    localStorage.setItem("carrito", JSON.stringify(cartItems));
    loadCartItems();
  }

  async function loadSavedAddress() {
    const response = await fetch(`${API_URL}/address/get`, {
      headers: {
        "x-auth-token": token,
      },
    });
    if (response.status === 404) return;
    const address = await response.json();
    document.getElementById("street").value = address.street;
    document.getElementById("city").value = address.city;
    document.getElementById("number").value = address.number;
    document.getElementById("zipCode").value = address.zipCode;
    document.getElementById("province").value = address.province;
    placeOrderButton.disabled = false;
  }

  async function loadUserInformation() {
    document.getElementById("username").value = user.username;
  }

  placeOrderButton.addEventListener("click", async function () {
    if (!cartItems || cartItems.length === 0) {
      alert("No se puede realizar una orden vacia!");
      return;
    }
    const orderData = {
      products: cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    };

    try {
      const response = await fetch(`${API_URL}/orders/create`, {
        method: "POST",
        headers: {
          "x-auth-token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.status === 201) {
        alert("Pedido realizado con exito.");
        localStorage.setItem("carrito", JSON.stringify([]));
        window.location.href = "../orders/manage-user-orders.html";
      }
    } catch (error) {
      console.error("Error al realizar el pedido:", error);
    }
  });

  loadCartItems();
  loadSavedAddress();
  loadUserInformation();
});
