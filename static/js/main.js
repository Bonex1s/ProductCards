document.addEventListener("DOMContentLoaded", function () {
  const productList = document.getElementById("productList");
  const submitButton = document.getElementById("submitButton");

  function updateProductList(product) {
    const productCard = document.createElement("li");
    productCard.innerHTML = `
      <div>
        <h1>${product.name}</h1>
        <p>${product.model}</p>
        <p>${product.price}</p>
        <p>${product.color}</p>
        <p>${product.text}</p>
      </div>
    `;

    productList.appendChild(productCard);
  }

  function submitForm() {
    const formData = {
      name: document.getElementById("productName").value,
      model: document.getElementById("model").value,
      price: document.getElementById("price").value,
      color: document.getElementById("color").value,
      text: document.getElementById("text-block").value,
    };

    fetch("/api/addProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        updateProductList(data.product);
      })
      .catch((error) => {
        console.error("Ошибка при добавлении товара:", error);
      });
  }

  if (submitButton) {
    submitButton.addEventListener("click", submitForm);
  }

  if (productList) {
    fetch("/api/getProducts")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((product) => {
          updateProductList(product);
        });
      })
      .catch((error) => {
        console.error("Ошибка при получении товаров:", error);
      });
  }
});
