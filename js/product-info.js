document.addEventListener("DOMContentLoaded", function(){
    const username = sessionStorage.getItem("username") || localStorage.getItem("username");
if (!username){
    alert ("usted debe hacer login")
    setTimeout(function() {
        window.location.href = "login.html";
      }, 2300);}

    //

    const prodID = localStorage.getItem("prodID");

    console.log(prodID)
})