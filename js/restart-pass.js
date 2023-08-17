document.addEventListener("DOMContentLoaded", function(){
    const restartPassForm = document.getElementById("formRestartPass");
  
    restartPassForm.addEventListener("submit", function(event) {
        event.preventDefault(); 
  
        const emailInput = document.getElementById("email");
  
        const email = emailInput.value.trim();
  
        if (email === "") {
            alert("Por favor ingrese un email");
            return;
        }
  
        sessionStorage.setItem("email", email);
        window.location.href = "restart-success.html";
    });
});