import { API_URL } from "../config.js";

document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");
  const ordersList = document.getElementById("orders-list");

  async function fetchOrders() {
    try {
      const response = await fetch(`${API_URL}/orders/all`, {
        headers: {
          "x-auth-token": token,
        },
      });
      const orders = await response.json();
      console.log(orders);

      if (!orders || orders.length === 0) {
        return;
      }
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
          <p><strong>Cliente:</strong> ${order.user.username}</p>
          <p><strong>Dirección:</strong> ${order.user.address.street} ${
        order.user.address.number
      }, ${order.user.address.city}</p>
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
          <p>Estado: ${order.orderStatus}</p>
        </div>
        <div class="order-actions">
          <button class="edit-button" data-id="${
            order.id
          }">Cambiar estado de orden</button>
          <button class="delete-button" data-id="${order.id}">Eliminar</button>
        </div>
      `;
      ordersList.appendChild(orderItem);
    });

    document.querySelectorAll(".edit-button").forEach((button) => {
      button.addEventListener("click", function () {
        const orderId = this.getAttribute("data-id");
        showStatusOptions(orderId);
      });
    });

    document.querySelectorAll(".delete-button").forEach((button) => {
      button.addEventListener("click", function () {
        const orderId = this.getAttribute("data-id");
        deleteOrder(orderId);
      });
    });
  }

  function showStatusOptions(orderId) {
    const statusOptions = ["PENDIENTE", "EN_PROCESO", "ENVIADA"];
    const select = document.createElement("select");
    select.innerHTML = statusOptions
      .map(
        (status) => `
      <option value="${status}">${status}</option>
    `
      )
      .join("");

    const confirmButton = document.createElement("button");
    confirmButton.textContent = "Confirmar";
    const container = document.createElement("div");
    container.appendChild(select);
    container.appendChild(confirmButton);
    const dialog = document.createElement("div");
    dialog.className = "status-dialog";
    dialog.appendChild(container);
    document.body.appendChild(dialog);
    confirmButton.addEventListener("click", async function () {
      const selectedStatus = select.value;
      try {
        const response = await fetch(
          `${API_URL}/orders/changeStatus/${orderId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": token,
            },
            body: JSON.stringify({ orderStatus: selectedStatus }),
          }
        );

        if (!response.ok) {
          alert("No se ha podido actualizar el estado de la orden");
          return;
        }
        location.reload();
      } catch (error) {
        console.error("Error al actualizar el estado de la orden:", error);
        alert("Hubo un error al actualizar el estado de la orden");
      } finally {
        document.body.removeChild(dialog);
      }
    });
  }

  async function deleteOrder(orderId) {
    const confirmDelete = confirm(
      "¿Estás seguro de que deseas eliminar esta orden?"
    );
    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/orders/delete/${orderId}`, {
        method: "DELETE",
        headers: {
          "x-auth-token": token,
        },
      });

      if (!response.ok) {
        alert("No se ha podido eliminar la orden");
        return;
      }

      location.reload();
    } catch (error) {
      console.error("Error al eliminar la orden:", error);
      alert("Hubo un error al eliminar la orden");
    }
  }

  fetchOrders();
});
