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
})