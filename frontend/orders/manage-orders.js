document.addEventListener("DOMContentLoaded", function () {
  const ordersList = document.getElementById("orders-list");

  async function fetchOrders() {
    try {
      const response = await fetch("http://localhost:3000/orders/");
      const orders = await response.json();
      displayOrders(orders);
    } catch (error) {
      console.error("Error al obtener las órdenes:", error);
    }
  }

  function displayOrders(orders) {
    ordersList.innerHTML = "";

    orders.forEach((order) => {
      const orderItem = document.createElement("div");
      orderItem.className = "order-item";
      orderItem.innerHTML = `
        <div class="order-details">
          <h3>Orden #${order.id}</h3>
          <p><strong>Cliente:</strong> ${order.ownerName}</p>
          <p><strong>Dirección:</strong> ${order.address.street} ${
        order.address.number
      }, ${order.address.city}</p>
          <p><strong>Productos:</strong></p>
          <ul>
            ${order.products
              .map(
                (product) => `
              <li>${product.product.name} (Cantidad: ${product.quantity})</li>
            `
              )
              .join("")}
          </ul>
          <p><strong>Total:</strong> $${order.totalPrice}</p>
        </div>
        <div class="order-actions">
          <button class="edit-button" data-id="${order.id}">Editar</button>
          <button class="delete-button" data-id="${order.id}">Eliminar</button>
        </div>
      `;
      ordersList.appendChild(orderItem);
    });
  }

  fetchOrders();
});
