document.addEventListener("DOMContentLoaded", function () {
  const myList = document.getElementById("showProd");
  const baseURL = "https://japceibal.github.io/emercado-api/cats_products/"; //url base
  const catID = localStorage.getItem("catID"); //categoría de productos seleccionada guardada en localStorage
  const puntoJSON = ".json"; //finalización del url
  let URL = baseURL+catID+puntoJSON; //url final

  
fetch(URL)
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

    let categoria= data.catName;
    document.getElementById("tituloProd").textContent+= ' "' + categoria + '"' //modificación del título de la página donde anuncia la categoría seleccionada
  })
  
  .catch(error => console.log(error));
});