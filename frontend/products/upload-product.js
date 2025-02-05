document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");
  const uploadForm = document.getElementById("upload-product-form");

  uploadForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const productData = {
      name: document.getElementById("product-name").value,
      value: parseFloat(document.getElementById("product-value").value),
      image: document.getElementById("product-image").value,
      description: document.getElementById("product-description").value,
      type: document
        .getElementById("product-type")
        .value.split(",")
        .map((t) => t.trim()),
      calories: parseInt(document.getElementById("product-calories").value),
    };

    try {
      const response = await fetch("http://localhost:3000/products/create", {
        method: "POST",
        headers: {
          "x-auth-token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });
      if (response.status === 201) {
        alert("Producto subido con éxito.");
        window.location.href = "../index.html";
      } else {
        alert("Ha ocurrido un error");
      }
    } catch (error) {
      console.error("Error al subir el producto:", error);
    }
  });
});
