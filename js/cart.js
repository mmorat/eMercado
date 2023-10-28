document.addEventListener("DOMContentLoaded", function () {
  const baseURL = "https://japceibal.github.io/emercado-api/user_cart/";
  const userID = 25801; // ID de usuario específico
  const URL = baseURL + userID + ".json";

  let USD = 40; // valor del dólar en UYU 

  const cart = document.getElementById("cart");
  const total = document.getElementById("total");
  const costoEnvio = document.getElementById("costoEnvio");
  const costoTotalEnvio = document.getElementById("costoTotalEnvio");
  const envioRadios = document.getElementsByName("envio");

  let arrPreciosUSD = [];

  let envioSeleccionado = "";
  let precioEnvio = "";
  let totalConEnvio = "";


  //darkmode
  function getTheme(){
    const htmlElement = document.querySelector('html');
    return htmlElement.getAttribute('data-bs-theme');
    }

  const switchBackgroundClasses = (fromClass, toClass) => {
    const elements = document.querySelectorAll(`.${fromClass}`);
    
    elements.forEach(element => {
      element.classList.remove(fromClass);
      element.classList.add(toClass);
    });
  };

  function darkmodeDinamico() {
    
    const tema = getTheme();
  
    if (tema === 'dark') {
      switchBackgroundClasses('bg-light', 'bg-dark');
      switchBackgroundClasses('btn-light', 'btn-dark'); 
    } else if (tema === 'light'){
      switchBackgroundClasses('bg-dark', 'bg-light');
      switchBackgroundClasses('btn-dark', 'btn-light');  
    };
  };

  // función para sumar todos los elementos de un array
  function sumarArray(arr) {
    return arr.reduce((acumulador, elemento) => acumulador + elemento, 0);
  }

  // agrega event listener para cada botón radial, actualizando el valor de envioSeleccionado y el valor total
  envioRadios.forEach(radio => {
    radio.addEventListener("change", function() {
      envioSeleccionado = parseFloat(this.value);
      actualizarTotal();
    });
  });
  
  // función para actualizar el total
  function actualizarTotal() {
    // vaciar array
    arrPreciosUSD = [];
    // agrega todos los subtotales en dólares al array
    const preciosUSD = cart.querySelectorAll(".usd");
    preciosUSD.forEach((element) => {
      arrPreciosUSD.push(parseInt(element.textContent));
    });
    // convierte todos los precios en pesos a dólares y los agrega al array
    const preciosUYU = cart.querySelectorAll(".uyu");
    preciosUYU.forEach((element) => {
      let precioEnUSD = parseInt(element.textContent) / USD;
      arrPreciosUSD.push(precioEnUSD);
    });
    // calcula costo total del carrito, costo de envío, y el total del carrito con el envío
    let precioCarrito = sumarArray(arrPreciosUSD);
    total.textContent =  `USD$ `+ precioCarrito;

    precioEnvio = precioCarrito*envioSeleccionado;
    costoEnvio.textContent =  `USD$ `+ precioEnvio;

    totalConEnvio = precioCarrito + precioEnvio;
    costoTotalEnvio.textContent =  `USD$ `+ totalConEnvio;
  }




  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
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
        td4.appendChild(input);
        articulo.appendChild(td4);
        

        const td5 = document.createElement("td");
        td5.classList.add("td5");
        const p = document.createElement("p");
        p.textContent = `${product.currency} $`;
        td5.appendChild(p);
        articulo.appendChild(td5);

        const td6 = document.createElement("td");
        td6.classList.add("td6");
        let subtotal = input.value * product.unitCost;
        const pSubtotal = document.createElement("p");
        pSubtotal.textContent = subtotal;
        if (product.currency === "USD") {
          td6.classList.add("usd");
        } else if (product.currency === "UYU") {
          td6.classList.add("uyu");
        }
        td6.appendChild(pSubtotal);
        articulo.appendChild(td6);

        const td7 = document.createElement("td");
        td7.classList.add("td7");
        const button = document.createElement("button");
        button.textContent = "Eliminar";
        button.classList.add("btn", "btn-danger");
        td7.appendChild(button);
        articulo.appendChild(td7);

        button.addEventListener("click", () => {
           const index = arrayProd.indexOf(product.id);
           if (index !== -1) {
               arrayProd.splice(index, 1);
               localStorage.setItem("cartProducts", JSON.stringify(arrayProd));
           }

           articulo.remove();
           actualizarTotal();
        });

        cart.appendChild(articulo);

        actualizarTotal();
        darkmodeDinamico();

        input.addEventListener("input", (e) => {
          e.stopPropagation();
          subtotal = input.value * product.unitCost;
          pSubtotal.textContent = subtotal;
          actualizarTotal();
        });
      });
    })
    .catch((error) =>
      console.error("Error al obtener los datos del carrito:", error)
    );

  //carrito manual

  const arrayProd = JSON.parse(localStorage.getItem("cartProducts")) || [];
  arrayProd.forEach((id) => {
    const productURL = `https://japceibal.github.io/emercado-api/products/${id}.json`;
    fetch(productURL)
      .then((response) => response.json())
      .then((product) => {
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
        input.value = "1";
        input.min = "0";
        input.max = "10";
        input.classList.add("bg-light");
        td4.appendChild(input);
        articulo.appendChild(td4);

        const td5 = document.createElement("td");
        td5.classList.add("td5");
        const p = document.createElement("p");
        p.textContent = `${product.currency} $`;
        td5.appendChild(p);
        articulo.appendChild(td5);

        const td6 = document.createElement("td");
        td6.classList.add("td6");
        let subtotal = input.value * product.cost;
        const pSubtotal = document.createElement("p");
        pSubtotal.textContent = subtotal;
        if (product.currency === "USD") {
          td6.classList.add("usd");
        } else if (product.currency === "UYU") {
          td6.classList.add("uyu");
        }
        td6.appendChild(pSubtotal);
        articulo.appendChild(td6);

        const td7 = document.createElement("td");
        td7.classList.add("td7");
        const button = document.createElement("button");
        button.textContent = "Eliminar";
        button.classList.add("btn", "btn-danger");
        td7.appendChild(button);
        articulo.appendChild(td7);

        button.addEventListener("click", () => {
           const index = arrayProd.indexOf(product.id);
           if (index !== -1) {
               arrayProd.splice(index, 1);
               localStorage.setItem("cartProducts", JSON.stringify(arrayProd));
           }

           articulo.remove();
           actualizarTotal();
        });

        cart.appendChild(articulo);

        actualizarTotal();
        darkmodeDinamico();

        input.addEventListener("input", (e) => {
          e.stopPropagation();
          subtotal = input.value * product.cost;
          pSubtotal.textContent = subtotal;
          actualizarTotal();
        });
      });
  });


});
