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
})
const logout = document.getElementById("logout")
logout.addEventListener('click', function () {
    // Eliminar el nombre de usuario del almacenamiento local y la sesión
    sessionStorage.removeItem('username');
    localStorage.removeItem('username');
  
    // Redirigir al usuario a la página de inicio de sesión
    window.location.href = 'login.html';
  });

