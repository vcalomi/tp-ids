document.addEventListener("DOMContentLoaded", function () {
  const cartItems = JSON.parse(localStorage.getItem("carrito")) || [];
  const cartItemsContainer = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");
  const customerForm = document.getElementById("customer-form");
  const addressForm = document.getElementById("address-form");
  const placeOrderButton = document.getElementById("place-order");

  let ownerName = "";
  let addressId = "";

  function loadCartItems() {
    cartItemsContainer.innerHTML = "";
    let totalPrice = 0;

    cartItems.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}" />
        <span>${item.name}</span>
        <span>Cantidad: ${item.quantity}</span>
        <span>Precio: $${item.value * item.quantity}</span>
      `;
      cartItemsContainer.appendChild(cartItem);
      totalPrice += item.value * item.quantity;
    });

    totalPriceElement.textContent = totalPrice.toFixed(2);
  }

  customerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    ownerName = document.getElementById("customer-name").value;
    alert("Nombre guardado correctamente.");
  });

  addressForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const addressData = {
      street: document.getElementById("street").value,
      city: document.getElementById("city").value,
      number: document.getElementById("number").value,
      zipCode: document.getElementById("zipCode").value,
      province: document.getElementById("province").value,
    };

    try {
      const response = await fetch("http://localhost:3000/address/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addressData),
      });
      const data = await response.json();

      addressId = data.id;
      alert("Dirección guardada correctamente.");
      placeOrderButton.disabled = false;
    } catch (error) {
      console.error("Error al guardar la dirección:", error);
    }
  });

  placeOrderButton.addEventListener("click", async function () {
    if (!ownerName || !addressId) {
      alert(
        "Completa los datos del cliente y la dirección antes de realizar el pedido."
      );
      return;
    }

    const orderData = {
      products: cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
      ownerName,
      addressId,
    };

    try {
      const response = await fetch("http://localhost:3000/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      const data = await response.json();
      alert("Pedido realizado con éxito.");
      localStorage.removeItem("cart");
      window.location.href = "/";
    } catch (error) {
      console.error("Error al realizar el pedido:", error);
    }
  });

  loadCartItems();
});
