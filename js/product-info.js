document.addEventListener("DOMContentLoaded", function(){
    const username = sessionStorage.getItem("username") || localStorage.getItem("username");
if (!username){
    alert ("usted debe hacer login")
    setTimeout(function() {
        window.location.href = "login.html";
      }, 2300);}

      // busca el user-display y crea const para lo sig.
      const userDisplayElement = document.getElementById('user-display');

      // si existe un nombre de usuario, se muestra
      if (username) {
       userDisplayElement.textContent = username;
      }
      //

        const selectedProductId = localStorage.getItem("selectedProductId");
        
        if (selectedProductId) {
          const productInfoURL = `https://japceibal.github.io/emercado-api/products/${selectedProductId}.json`;
      
          fetch(productInfoURL)
            .then((response) => response.json())
            .then((product) => {  
              // Actualiza el contenido de la página con la información del producto
              
              
              const productContainer = document.createElement("div");
              productContainer.setAttribute("id", "showInfo");
              productContainer.classList.add("container");
              
            
              productContainer.innerHTML = `
              <h1>${product.name}</h1>
            
              <div>
                  <h4>Categoría:</h4>
                  <p>${product.category} </p>
                  <h4>Cantidad de unidades vendidas:</h4>
                  <p>${product.soldCount}</p>
                  
                  <h4>Precio</h4>
                  <p> ${product.currency} $${product.cost}</p>
                  
                  <h4>Descripción</h4>
                  <p> ${product.description}</p>
                  
                  <h4>Imagenes Ilustrativas</h4>
                  <div id="imagenes">
                      <img src="${product.images[0]}">
                      <img src="${product.images[1]}">
                      <img src="${product.images[2]}">
                      <img src="${product.images[3]}">
                  </div>
                  <h4>Productos Relacionados</h4>
                  <div id="relProducts">
                      <div>
                          <img src="${product.relatedProducts[0].image}">
                          <h5> ${product.relatedProducts[0].name}</h5>
                      </div>
                      <div>
                          <img src="${product.relatedProducts[1].image}">
                          <h5> ${product.relatedProducts[1].name}</h5>
                      </div>
                  </div>
              </div>
               `;
              document.querySelector("main").appendChild(productContainer);
            })
            .catch((error) => {
              console.error("Error al cargar la información del producto", error);
            });
        } else {
          // Maneja el caso en el que no se haya seleccionado ningún producto
          console.log("No se ha seleccionado ningún producto.");
        }
      
// codigo sobre comentarios 

const containerdecomentario = document.getElementById('comments-container');
const formulariocomentario = document.getElementById('comment-form');

// Hacer una solicitud a la API para obtener los 10 comentarios más recientes
fetch(`https://japceibal.github.io/emercado-api/products_comments/${selectedProductId}.json`)
    .then(response => response.json())
    .then(data => {
        // Mostrar los comentarios en la página
        data.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.innerHTML = `
                <strong>Nombre: ${comment.user}</strong>
                <p>Comentario: ${comment.description}</p>
                
                
                <div class="rating">${getStarsHTML(comment.score) }</div>
                <p>Fecha: ${comment.dateTime}</p><hr>
              
            `;
            containerdecomentario.appendChild(commentDiv);
        });
    });


// Función para generar HTML de estrellas
function getStarsHTML(rating) {
    const starsHTML = Array(rating).fill('<span class="fa fa-star checked"></span>').join('');
    const letnumero = 5-rating;
    const casillasvacias = Array(letnumero).fill('<span class="fa fa-star "></span>').join('');
    return `<div class="stars">${starsHTML + casillasvacias}</div>`;
}

// Agregar un evento de escucha para el formulario de comentarios
formulariocomentario.addEventListener('submit', function (e) {
    e.preventDefault();

    const commentText = document.getElementById('comment').value;
    const rating = document.getElementById('rating').value;
    // Obtener la fecha y hora actual
    const now = new Date();
    const fechaHora = now.toLocaleString(); // Obtiene la fecha y hora en un formato legible
    

    const commentDiv = document.createElement('div');

    commentDiv.innerHTML = `
        <strong>Nombre: ${username}</strong><br>
        <p>Comentario: ${commentText}</p>
        <div class="rating">${getStarsHTML(Number(rating))}</div>
        <p>Fecha: ${fechaHora}</p> 
        <hr>
    `;
    containerdecomentario.insertBefore(commentDiv, containerdecomentario.firstChild);

    // Limpiar el formulario
    formulariocomentario.reset();
});     
      
})