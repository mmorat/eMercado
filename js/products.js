const myList = document.getElementById("prodAutos");
const autosUrl = "https://japceibal.github.io/emercado-api/cats_products/101.json";

fetch(autosUrl)
  .then(response => response.json())
  .then(data => {
    data.products.forEach(product => {
      const item = document.createElement("div");
      item.classList.add("producto");

      const img = document.createElement("img");
      img.src = product.image;
      item.appendChild(img);
      
      const soldCountDiv = document.createElement("div");
      soldCountDiv.classList.add("sold-count")
      soldCountDiv.textContent = `${product.soldCount} vendidos`;
      item.appendChild(soldCountDiv);

      const h4 = document.createElement("h4");
      h4.textContent = `${product.name} - ${product.currency}$ ${product.cost}`;
      item.appendChild(h4);

      item.appendChild(document.createTextNode(product.description));
      

      myList.appendChild(item);
    });
  })
  .catch(error => console.log(error));
  document.addEventListener("DOMContentLoaded", function(){
    const username = sessionStorage.getItem("username") || localStorage.getItem("username");
if (!username){
    alert ("usted debe hacer login")
    setTimeout(function() {
        window.location.href = "login.html";
      }, 2300);}
})