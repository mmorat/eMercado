document.addEventListener("DOMContentLoaded", function(){ 

    const loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", function(event) {
      event.preventDefault();
      const username = document.getElementById("username").value;
      if (username.trim() !== "") {
        // Almacenar el nombre en sessionStorage para usarlo en home.js
        sessionStorage.setItem("username", username);
        // Redirigir a la página principal
        window.location.href = "index.html";
      } else {
        alert("El usuario no está logueado, por favor rellene los campos.");
      }
    });

  });