const baseURL = "https://japceibal.github.io/emercado-api/user_cart/";
const userID = 25801; // ID de usuario específico
const URL = baseURL + userID + ".json";
const cart = document.getElementById("cart");


fetch(URL)
    .then(response => response.json())
    .then(data => {
        data.articles.forEach((product) => {
            const articulo = document.createElement("tr");

            const td1 = document.createElement("td");
            const img = document.createElement("img");
            img.src = product.image;
            td1.appendChild(img);
            articulo.appendChild(td1)
            
            const td2 = document.createElement("td");
            const nombre = document.createElement("p");
            nombre.textContent = product.name;
            td2.appendChild(nombre);
            articulo.appendChild(td2);

            const td3 = document.createElement("td");
            const precio = document.createElement("p");
            precio.textContent = `${product.currency}$ ${product.unitCost}`;
            td3.appendChild(precio);
            articulo.appendChild(td3);

            const td4 = document.createElement("td");
            const input = document.createElement("input");
            input.type = "number";
            input.name = "Cant.";
            input.value = product.count; 
            input.min = "0";
            input.max = "10";
            td4.appendChild(input)
            articulo.appendChild(td4)

            const td5 = document.createElement("td");
            const p = document.createElement("p")
            let subtotal = input.value * product.unitCost;
            p.textContent = `${product.currency}$ ${subtotal}`;
            td5.appendChild(p);
            articulo.appendChild(td5);

            cart.appendChild(articulo);

            input.addEventListener("input", (e)=>{
                e.stopPropagation();
                subtotal = input.value * product.unitCost;
                p.textContent = `${product.currency}$ ${subtotal}`;          
    
            })
        })
        

    })
    .catch(error => console.error('Error al obtener los datos del carrito:', error));
  
  
  