const token = localStorage.getItem("token");

document.addEventListener("DOMContentLoaded", function () {
  const ordersList = document.getElementById("orders-list");

  async function fetchOrders() {
    try {
      const response = await fetch("http://localhost:3000/orders/", {
        headers: {
          "x-auth-token": token,
        },
      });
      const information = await response.json();
      console.log(information);

      displayOrders(information.address, information.orders);
    } catch (error) {
      console.error("Error al obtener las órdenes:", error);
    }
  }

  function displayOrders(address, orders) {
    ordersList.innerHTML = "";

    orders.forEach((order) => {
      const orderItem = document.createElement("div");
      orderItem.className = "order-item";
      orderItem.innerHTML = `
        <div class="order-details">
          <h3>Orden #${order.id}</h3>
          <p><strong>Dirección:</strong> ${address.street} ${address.number}, ${
        address.city
      }</p>
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
          <button class="delete-button" data-id="${
            order.id
          }">Cancelar Orden</button>
        </div>
      `;
      ordersList.appendChild(orderItem);
    });

    document.querySelectorAll(".delete-button").forEach((button) => {
      button.addEventListener("click", function () {
        const orderId = this.getAttribute("data-id");
        cancelOrder(orderId);
      });
    });
  }

  async function cancelOrder(orderId) {
    alert(`Cancelar orden #${orderId}`);
  }

  fetchOrders();
});
