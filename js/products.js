let autos = "https://japceibal.github.io/emercado-api/cats_products/101.json"
fetch(autos)
.then(response => response.json())
.then(data => {
    for(const product of data.products) {
        const item = document.createElement("div.producto");
        item.appendChild(document.createElement("img")).src = product.image
        item.appendChild(document.createElement("h4")).textContent =
        product.name + " - " + product.currency + "$ " + product.cost;
        item.append(product.description);
          myList.appendChild(item)
    }
    
})
.catch(error => console.log(error))





const myList = document.getElementById("prodAutos");
