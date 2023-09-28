document.addEventListener("DOMContentLoaded", function () {
  // logout
  const logout = document.getElementById("logout");

  logout.addEventListener('click', function () {
    // Elimina el nombre de usuario del almacenamiento local y la sesión
    sessionStorage.removeItem('username');
    localStorage.removeItem('username');
});

    const username = sessionStorage.getItem("username") || localStorage.getItem("username");
    
    if (!username) {
      alert("usted debe hacer login")
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



   
  });