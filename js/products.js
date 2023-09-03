// display username
 
const username = sessionStorage.getItem("username") || localStorage.getItem("username");
if (!username) {
  alert("You must log in");
  setTimeout(function () {
    window.location.href = "login.html";
  }, 2300);
}

  // busca el user-display y crea const para lo sig.
  const userDisplayElement = document.getElementById('user-display');

  // si existe un nombre de usuario, se muestra
  if (username) {
      userDisplayElement.textContent = username;
  }

  //

document.addEventListener("DOMContentLoaded", function () {

  const lista = document.getElementById("showProd");
  const catID = localStorage.getItem("catID");
  const baseURL = "https://japceibal.github.io/emercado-api/cats_products/";
  const puntoJSON = ".json";
  let URL = baseURL + catID + puntoJSON;

  function compararAscendente(a, b) {
    return a.cost - b.cost;
  }

  function compararDescendente(a, b) {
    return b.cost - a.cost;
  }

  function compararRelevancia(a, b) {
    return b.soldCount - a.soldCount;
  }

  function limpiarLista() {
    while (lista.firstChild) {
      lista.removeChild(lista.firstChild);
    }
  }

  function mostrarProducts(products) {
    products.forEach((product) => {
      const item = document.createElement("div");
      item.classList.add("producto");

      const img = document.createElement("img");
      img.src = product.image;
      item.appendChild(img);

      const soldCountDiv = document.createElement("div");
      soldCountDiv.classList.add("sold-count");
      soldCountDiv.textContent = `${product.soldCount} vendidos`;
      item.appendChild(soldCountDiv);

      const h4 = document.createElement("h4");
      h4.textContent = `${product.name} - ${product.currency}$ ${product.cost}`;
      item.appendChild(h4);

      item.appendChild(document.createTextNode(product.description));

      lista.appendChild(item);
    });
  }

  let arrayProducts = []; // array para guardar los datos obtenidos a través de fetch

  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      arrayProducts = data.products; // guarda los datos en el array creado anteriormente
      data.products.forEach((product) => {
        const item = document.createElement("div");
        item.classList.add("producto");

        const img = document.createElement("img");
        img.src = product.image;
        item.appendChild(img);

        const soldCountDiv = document.createElement("div");
        soldCountDiv.classList.add("sold-count");
        soldCountDiv.textContent = `${product.soldCount} vendidos`;
        item.appendChild(soldCountDiv);

        const h4 = document.createElement("h4");
        h4.textContent = `${product.name} - ${product.currency}$ ${product.cost}`;
        item.appendChild(h4);

        item.appendChild(document.createTextNode(product.description));

        lista.appendChild(item);
      });
      
      //modificación del título de la página donde anuncia la categoría seleccionada
      let categoria = data.catName;
      document.getElementById("tituloProd").textContent +=
        ' "' + categoria + '"'; 

      //botones:
      const precioA = document.getElementById("sortAsc");
      const precioD = document.getElementById("sortDesc");
      const rel = document.getElementById("sortBySold");
      const filtrar = document.getElementById("rangeFilterCount");
      const limpiar = document.getElementById("clearRangeFilter");
      //input precio:
      const pMin = document.getElementById("rangeFilterCountMin");
      const pMax = document.getElementById("rangeFilterCountMax");

     //función que ordena según el precio de manera ascendente
      precioA.addEventListener("click", function () {
        arrayProducts.sort(compararAscendente);
        limpiarLista();
        mostrarProducts(arrayProducts);
      });

      //función que ordena según el precio de manera descendente
      precioD.addEventListener("click", function () {
        arrayProducts.sort(compararDescendente);
        limpiarLista();
        mostrarProducts(arrayProducts);
      });

      //función que ordena según la cantidad de unidades vendidas
      rel.addEventListener("click", function () {
        arrayProducts.sort(compararRelevancia);
        limpiarLista();
        mostrarProducts(arrayProducts);
      });

      //función que, al presionar "Filtrar", muestra sólo los productos que entran en el rango de precios ingresado
      filtrar.addEventListener("click", function () {
        let arrayFiltrado = [];

        arrayProducts.forEach((product) => {
          const min = pMin ? pMin.value : 0; // si pMin está definido, min utiliza su valor. Si no lo está, min vale 0.
          const max = pMax !== undefined && pMax.value !== '' ? parseFloat(pMax.value) : Infinity; // si pMax está definido, max utiliza su valor. Si no lo está, max vale Infinity.

          if (product.cost >= min && product.cost <= max) {
            arrayFiltrado.push(product);
          }
        });

        limpiarLista();
        mostrarProducts(arrayFiltrado);
      });

      //función que limpia  los campos de precio mínimo y máximo y nos vuelve a mostrar todos los productos
      limpiar.addEventListener("click", function () {
        limpiarLista();
        pMin.value = "";
        pMax.value = "";
        mostrarProducts(arrayProducts);
      });
    })
    .catch((error) => console.log(error));
});
