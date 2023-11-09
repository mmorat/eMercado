const username = sessionStorage.getItem("username") || localStorage.getItem("username");
const email = document.getElementById("email");

document.addEventListener("DOMContentLoaded", ()=>{
    email.value=username;
});