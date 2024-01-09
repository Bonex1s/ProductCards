document.addEventListener("DOMContentLoaded", function () {
  const inputPanel = document.getElementById("input-panel");
  const createButtonMain = document.getElementById("create-button-main");
  const closeButton = document.getElementById("back-button");

  createButtonMain.addEventListener("click", function () {
    inputPanel.style.display = "block";
  });

  closeButton.addEventListener("click", function () {
    inputPanel.style.display = "none";
  });

  //   =========================================   FORM

  function submitForm() {
    const formData = {
      // Соберите данные из полей формы
      // Пример: name: document.getElementById('productName').value,
      name: document.getElementById("productName").value,
      model: document.getElementById("model").value,
      price: document.getElementById("price").value,
      color: document.getElementById("color").value,
      text: document.getElementById("text-block").value,
    };

    // Отправьте данные на сервер
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

        // Обновите интерфейс, добавив новую карточку товара
        updateProductList(data.product);
      })
      .catch((error) => {
        console.error("Ошибка при добавлении товара:", error);
      });
  }

  function updateProductList(product) {
    const productList = document.getElementById("productList");

    console.log("productList", product.productList);

    // Создайте элемент карточки товара
    const productCard = document.createElement("li");
    productCard.innerHTML = `
    <div>
      <img src="${product.image}" alt="${product.name}" />
      <h1>${product.name}</h1>
      <!-- Добавьте другие детали товара по необходимости -->
    </div>
  `;

    // Добавьте карточку товара в список товаров
    productList.appendChild(productCard);
  }
  const submitButton = document.getElementById("submitButton");
  submitButton.addEventListener("click", submitForm);
});
// Найдите кнопку и добавьте обработчик события
