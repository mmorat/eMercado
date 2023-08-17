document.addEventListener("DOMContentLoaded", function(){
    const successMessage = sessionStorage.getItem("successMessage");
    const successMessageElement = document.getElementById("successMessage");
    successMessageElement.textContent = successMessage;
  });

  const successMessage = "Se te ha enviado un correo al email que has ingresado. Por favor, verifica tu bandeja de entrada y sigue las instrucciones para resetear tu contraseña.";
        sessionStorage.setItem("successMessage", successMessage);