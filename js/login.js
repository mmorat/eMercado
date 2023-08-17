document.addEventListener("DOMContentLoaded", function(){
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", function(event) {
      event.preventDefault(); 

      const usernameInput = document.getElementById("username");
      const passwordInput = document.getElementById("password");

      const username = usernameInput.value.trim();

      if (username === "") {
          alert("Por favor ingrese un nombre de usuario");
          return;
      }

      sessionStorage.setItem("username", username);
      window.location.href = "index.html";
  });
});