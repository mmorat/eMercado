document.addEventListener("DOMContentLoaded", function(){

    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });

        // display username
    
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
})

