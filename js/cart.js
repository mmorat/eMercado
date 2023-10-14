document.addEventListener("DOMContentLoaded", function(){


const baseURL = "https://japceibal.github.io/emercado-api/user_cart/";
const userID = 25801; // ID de usuario específico
const URL = baseURL + userID + ".json";
const cart = document.getElementById("cart");



fetch(URL)
    .then(response => response.json())
    .then(data => {
        data.articles.forEach((product) => {
            const articulo = document.createElement("tr");
            articulo.classList.add("articulo");


            const td1 = document.createElement("td");
            td1.classList.add("td1");
            const img = document.createElement("img");
            img.src = product.image;
            td1.appendChild(img);
            articulo.appendChild(td1);
            
            const td2 = document.createElement("td");
            td2.classList.add("td2");
            const nombre = document.createElement("p");
            nombre.textContent = product.name;
            td2.appendChild(nombre);
            articulo.appendChild(td2);

            const td3 = document.createElement("td");
            td3.classList.add("td3");
            const precio = document.createElement("p");
            precio.textContent = `${product.currency}$ ${product.unitCost}`;
            td3.appendChild(precio);
            articulo.appendChild(td3);

            const td4 = document.createElement("td");
            td4.classList.add("td4");
            const input = document.createElement("input");
            input.type = "number";
            input.name = "Cant.";
            input.value = product.count; 
            input.min = "0";
            input.max = "10";
            input.classList.add("bg-light");
            td4.appendChild(input)
            articulo.appendChild(td4)

            const td5 = document.createElement("td");
            td5.classList.add("td5");
            const p = document.createElement("p")
            let subtotal = input.value * product.unitCost;
            p.textContent = `${product.currency}$ ${subtotal}`;
            td5.appendChild(p);
            articulo.appendChild(td5);

            cart.appendChild(articulo);


            input.addEventListener("input", (e)=>{
                e.stopPropagation();
                const total = document.getElementById("total");
                subtotal = input.value * product.unitCost;
                p.textContent = `${product.currency}$ ${subtotal}`;  
    
            }) 
        })
        

    })
    .catch(error => console.error('Error al obtener los datos del carrito:', error));

    
    const arrayProd = JSON.parse(localStorage.getItem("cartProducts")) || [];
    const cartItems = {};
    
    arrayProd.forEach(id => {
      const productURL = `https://japceibal.github.io/emercado-api/products/${id}.json`;
      fetch(productURL)
        .then(response => response.json())
        .then(product => {
          if (!cartItems[id]) {
            // Si el producto no existe en el carrito, lo agregamos
            cartItems[id] = {
              product,
              quantity: 1
            };
          } else {
            // Si el producto ya existe en el carrito, aumentamos la cantidad
            cartItems[id].quantity++;
          }
    
          // Actualizamos el subtotal y creamos los elementos HTML
          updateCart();
        })
        .catch(error => console.error('Error al obtener los datos del carrito:', error));
    });
    
    function updateCart() {
      // Vaciamos el carrito para evitar duplicados
      cart.innerHTML = "";
    
      // Recorremos los productos en el carrito y actualizamos el carrito en HTML
      for (const id in cartItems) {
        const cartItem = cartItems[id];
        const product = cartItem.product;
        const quantity = cartItem.quantity;
    
        const articulo = document.createElement("tr");
        articulo.classList.add("articulo");
    
        const td1 = document.createElement("td");
        td1.classList.add("td1");
        const img = document.createElement("img");
        img.src = product.images[0];
        td1.appendChild(img);
        articulo.appendChild(td1);
    
        const td2 = document.createElement("td");
        td2.classList.add("td2");
        const nombre = document.createElement("p");
        nombre.textContent = product.name;
        td2.appendChild(nombre);
        articulo.appendChild(td2);
    
        const td3 = document.createElement("td");
        td3.classList.add("td3");
        const precio = document.createElement("p");
        precio.textContent = `${product.currency}$ ${product.cost}`;
        td3.appendChild(precio);
        articulo.appendChild(td3);
    
        const td4 = document.createElement("td");
        td4.classList.add("td4");
        const input = document.createElement("input");
        input.type = "number";
        input.name = "Cant.";
        input.value = quantity;
        input.min = "0";
        input.max = "10";
        input.classList.add("bg-light");
        td4.appendChild(input);
        articulo.appendChild(td4);
    
        const td5 = document.createElement("td");
        td5.classList.add("td5");
        const p = document.createElement("p");
        let subtotal = quantity * product.cost;
        p.textContent = `${product.currency}$ ${subtotal}`;
        td5.appendChild(p);
        articulo.appendChild(td5);
    
        cart.appendChild(articulo);
      }
    }
    
    
    }); 
  