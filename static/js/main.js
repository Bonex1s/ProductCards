document.addEventListener("DOMContentLoaded", async function () {
  const productList = document.getElementById("productList");
  const submitButton = document.getElementById("submitButton");

  async function updateProductList(product) {
    const productCard = document.createElement("li");

    if (product.image) {
      const blob = new Blob([new Uint8Array(product.image.data)], {
        type: product.image.mimeType,
      });
      const imageUrl = URL.createObjectURL(blob);
      productCard.innerHTML = `
        <img src="${imageUrl}" alt="Product" class="img-product">
        <h1 class="product-name">${product.name}</h1>
        <p>${product.model}</p>
        <p>${product.price}</p>
        <p>${product.color}</p>
        <p>${product.text}</p>
      `;
    } else {
      productCard.innerHTML = `
        <h1 class="product-name">${product.name}</h1>
        <p>${product.model}</p>
        <p>${product.price}</p>
        <p>${product.color}</p>
        <p>${product.text}</p>
        <p>Изображение отсутствует</p>
      `;
    }

    productList.appendChild(productCard);
  }

  async function submitForm() {
    const fileInput = document.getElementById("inputGroupFile02");
    const formData = new FormData();

    formData.append("image", fileInput.files[0]);
    formData.append("name", document.getElementById("productName").value);
    formData.append("model", document.getElementById("model").value);
    formData.append("price", document.getElementById("price").value);
    formData.append("color", document.getElementById("color").value);
    formData.append("text", document.getElementById("text-block").value);

    try {
      const response = await fetch("/api/addProduct", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      updateProductList(data.product);
    } catch (error) {
      console.error("Ошибка при добавлении товара:", error);
    }
  }

  if (submitButton) {
    submitButton.addEventListener("click", submitForm);
  }

  if (productList) {
    try {
      const response = await fetch("/api/getProducts");

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      data.forEach((product) => {
        updateProductList(product);
      });
    } catch (error) {
      console.error("Ошибка при получении товаров:", error);
    }
  }
});
