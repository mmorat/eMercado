document.addEventListener("DOMContentLoaded", function(){
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
})

