document.addEventListener("DOMContentLoaded", function(){
    const username = sessionStorage.getItem("username") || localStorage.getItem("username");
    if (!username){
        alert ("usted debe hacer login")
        setTimeout(function() {
            window.location.href = "login.html";
        }, 2300);}
        
        //

    const prodID = localStorage.getItem("prodID");
    const lista = document.getElementById("showInfo");
    const baseURL = "https://japceibal.github.io/emercado-api/products/";
    const puntoJSON = ".json";
    let URL = baseURL + prodID + puntoJSON;
      
    console.log(prodID);

    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        lista.innerHTML+= `
        <h1>${data.name}</h1>
        <br>
        <div>
            <h4>Categoría:</h4>
            <p>${data.category} </p>

            <h4>Cantidad de unidades vendidas:</h4>
            <p>${data.soldCount}</p>
            
            <h4>Precio</h4>
            <p> ${data.currency} $${data.cost}</p>
            
            <h4>Descripción</h4>
            <p> ${data.description}</p>
            
            <h4>Imagenes Ilustrativas</h4>
            <div id="imagenes">
                <img src="${data.images[0]}">
                <img src="${data.images[1]}">
                <img src="${data.images[2]}">
                <img src="${data.images[3]}">
            </div>
            
            <h4>Productos Relacionados</h4>
            <div id="relProducts">
                <div>
                    <img src="${data.relatedProducts[0].image}">
                    <h5> ${data.relatedProducts[0].name}</h5>
                </div>
                <div>
                    <img src="${data.relatedProducts[1].image}">
                    <h5> ${data.relatedProducts[1].name}</h5>
                </div>
            </div>
        </div>
        `;
        

    });



    })