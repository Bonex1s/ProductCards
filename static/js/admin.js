const inputPanel = document.getElementById("input-panel");
const createButtonMain = document.getElementById("create-button-main");
const closeButton = document.getElementById("back-button");
const productList = document.getElementById("productList");

createButtonMain.addEventListener("click", function () {
  inputPanel.style.display = "block";
});

closeButton.addEventListener("click", function () {
  inputPanel.style.display = "none";
});
