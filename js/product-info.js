document.addEventListener("DOMContentLoaded", function () { 
  const selectedProductId = localStorage.getItem("selectedProductId");



  function fetchInfo() {
    const productInfoURL = `https://japceibal.github.io/emercado-api/products/${selectedProductId}.json`;
    fetch(productInfoURL)
      .then((response) => response.json())
      .then((product) => {
        // Actualiza el contenido de la página con la información del producto


        const productContainer = document.createElement("div");
        productContainer.setAttribute("id", "showInfo");
        productContainer.classList.add("container");
        let arrayImagen = product.images;

        productContainer.innerHTML = `
      <h1>${product.name}</h1>

        <div id="infoProd">
            <h4>Categoría:</h4>
            <p>${product.category} </p>
            
            <h4>Cantidad de unidades vendidas:</h4>
            <p>${product.soldCount}</p>
        
            <h4>Precio</h4>
            <p> ${product.currency} $${product.cost}</p>
        
            <h4>Descripción</h4>
            <p> ${product.description}</p>
        </div>
        </div>
        
          <h4>Productos Relacionados</h4>
          <div id="relProducts">
              <div id="relProd0">
                  <img src="${product.relatedProducts[0].image}">
                  <h5> ${product.relatedProducts[0].name}</h5>
              </div>
              <div id="relProd1">
                  <img src="${product.relatedProducts[1].image}">
                  <h5> ${product.relatedProducts[1].name}</h5>
              </div>
          </div>
      </div>
      `;

        const carruInner = document.getElementById("carousel-inner");

        for (let index = 0; index < arrayImagen.length; index++) {
          const carouselItem = document.createElement("div");
          carouselItem.classList.add("carousel-item");

          const imgElement = document.createElement("img");
          imgElement.src = arrayImagen[index];
          imgElement.classList.add("d-block", "w-100");

          carouselItem.appendChild(imgElement);
          carruInner.appendChild(carouselItem);

          // Establece el primer elemento como activo
          if (index === 0) {
            carouselItem.classList.add("active");
          }
        }


        document.querySelector("main").appendChild(productContainer);
        document.getElementById("relProd0").addEventListener("click", function () {
          localStorage.setItem("selectedProductId", product.relatedProducts[0].id);
          location.reload();
        })
        document.getElementById("relProd1").addEventListener("click", function () {
          localStorage.setItem("selectedProductId", product.relatedProducts[1].id);
          location.reload();
        })
      })
      .catch((error) => {
        console.error("Error al cargar la información del producto", error);
      });
  }


  if (selectedProductId) {
    fetchInfo()
  } else {
    // Maneja el caso en el que no se haya seleccionado ningún producto
    console.log("No se ha seleccionado ningún producto.");
  }


  // codigo sobre comentarios 

  const containerComentarios = document.getElementById('comments-container');
  const formComentarios = document.getElementById('comment-form');
  let arrComentarios = [];


  function fetchComentarios() {
    fetch(`https://japceibal.github.io/emercado-api/products_comments/${selectedProductId}.json`)
      .then((response) => response.json())
      .then((data) => {
        arrComentarios = data.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));

        displayComentarios();
      })
      .catch((error) => {
        console.error("Error fetching comments", error);
      });
  }


  function displayComentarios() {
    const containerComentarios = document.getElementById('comments-container');
    containerComentarios.innerHTML = '';
    arrComentarios.forEach((comentario) => {
      const divComentarios = document.createElement('div');
      divComentarios.innerHTML = `
      <p><strong>Usuario: </strong> ${comentario.user}</p>
      <p><strong>Comentario: </strong> ${comentario.description}</p>
      <div class="rating">${getStarsHTML(comentario.score)}</div>
      <p>Fecha: ${comentario.dateTime}</p><hr>
    `;
      containerComentarios.appendChild(divComentarios);
    });
  }


  formComentarios.addEventListener('submit', function (e) {
    e.preventDefault();
    const commentText = document.getElementById('comment').value;
    const rating = document.getElementById('rating').value;
    const now = new Date();
    now.setUTCHours(now.getUTCHours() - 3);
    const fechaHora = now.toISOString().slice(0, 19).replace('T', ' ');;

    const nuevoComentario = {
      user: username,
      description: commentText,
      score: Number(rating),
      dateTime: fechaHora,
    };
    arrComentarios.push(nuevoComentario);
    displayComentarios();


    formComentarios.reset();
  });


  fetchComentarios();

  // Función para generar HTML de estrellas
  function getStarsHTML(rating) {
    const starsHTML = Array(rating).fill('<span class="fa fa-star checked"></span>').join('');
    const letnumero = 5 - rating;
    const casillasvacias = Array(letnumero).fill('<span class="fa fa-star "></span>').join('');
    return `<div class="stars">${starsHTML + casillasvacias}</div>`;
  }


  const btnComprar = document.getElementById("comprar");

  btnComprar.addEventListener("click", (e) => {
    // Recuperar el arreglo de productos del localStorage
    let cartProds = JSON.parse(localStorage.getItem("cartProducts")) || [];
  
    // Agregar el producto seleccionado al arreglo
    cartProds.push(selectedProductId);
  
    // Almacenar el arreglo actualizado en el localStorage
    localStorage.setItem("cartProducts", JSON.stringify(cartProds));
  });
  

})