const username = sessionStorage.getItem("username") || localStorage.getItem("username");
const email = document.getElementById("email");

document.addEventListener("DOMContentLoaded", ()=>{
    email.value=username;

    
 //VALIDACION Y Almacenamiento del usario en el localstorage
    const form = document.getElementById("perfil")
    form.addEventListener("submit", (e)=> {
    e.preventDefault();

    //input name

  let inputNombre = document.getElementById("nombre");
  let nombreTexto = document.getElementById("nombreValid");

  if (inputNombre.value === "") {
    inputNombre.classList.remove("is-valid");
    inputNombre.classList.add("is-invalid");

    nombreTexto.classList.remove("valid-feedback");
    nombreTexto.classList.add("invalid-feedback");

    nombreTexto.innerHTML = "Por favor, ingrese su nombre.";
  } else {
    inputNombre.classList.remove("is-invalid");
    inputNombre.classList.add("is-valid");

    nombreTexto.classList.remove("invalid-feedback");
    nombreTexto.classList.add("valid-feedback");
    nombreTexto.innerHTML = "";
  }
  localStorage.setItem("nombre", nombre.value);

    //input apellido
    
    let inputApellido = document.getElementById("apellido");
    let apellidoTexto = document.getElementById("apellidoValid");
 
    if (inputApellido.value === "") {
    inputApellido.classList.remove("is-valid");
    inputApellido.classList.add("is-invalid");

    apellidoTexto.classList.remove("valid-feedback");
    apellidoTexto.classList.add("invalid-feedback");

    apellidoTexto.innerHTML = "Por favor, ingrese su apellido.";
  } else {
    inputApellido.classList.remove("is-invalid");
    inputApellido.classList.add("is-valid");

    apellidoTexto.classList.remove("invalid-feedback");
    apellidoTexto.classList.add("valid-feedback");
    apellidoTexto.innerHTML = "";
  }
  localStorage.setItem("apellido", apellido.value);

  //input email
  let inputEmail = document.getElementById("email");
  let emailTexto = document.getElementById("emailValid");

  
  if (inputEmail.value === "") {
    inputEmail.classList.remove("is-valid");
    inputEmail.classList.add("is-invalid");

    emailTexto.classList.remove("valid-feedback");
    emailTexto.classList.add("invalid-feedback");

    emailTexto.innerHTML = "Por favor, ingrese correctamente su e-mail.";
  } else if (!inputEmail.value.includes("@")) {
    inputEmail.classList.remove("is-valid");
    inputEmail.classList.add("is-invalid");

    emailTexto.classList.remove("valid-feedback");
    emailTexto.classList.add("invalid-feedback");

    emailTexto.innerHTML = "Le falta @";
  } else {
    inputEmail.classList.remove("is-invalid");
    inputEmail.classList.add("is-valid");

    emailTexto.classList.remove("invalid-feedback");
    emailTexto.classList.add("valid-feedback");
    emailTexto.innerHTML = "";
  }
  
  localStorage.setItem("e-mail", email.value);

   //input telefono
   let inputel = document.getElementById("telefono");
   let telTexto = document.getElementById("telValid");

   if (inputel.value === "") {
    inputel.classList.remove("is-valid");
    inputel.classList.add("is-invalid");
 
    telTexto.classList.remove("valid-feedback");
    telTexto.classList.add("invalid-feedback");
 
    telTexto.innerHTML = "Por favor, ingrese su teléfono.";
   } else if (isNaN(inputel.value)) {
    inputel.classList.remove("is-valid");
    inputel.classList.add("is-invalid");
 
    telTexto.classList.remove("valid-feedback");
    telTexto.classList.add("invalid-feedback");
 
    telTexto.innerHTML = "tipee en formato numero por favor";
   } else {
    inputel.classList.remove("is-invalid");
    inputel.classList.add("is-valid");
 
    telTexto.classList.remove("invalid-feedback");
    telTexto.classList.add("valid-feedback");
    telTexto.innerHTML = "";
   }
   localStorage.setItem("telefono", telefono.value);


// Datos no obligatorios pero que se almacenan
   let input2nombre= document.getElementById("segundoNombre");
   localStorage.setItem("segundo nombre", segundoNombre.value);
   let input2apellido= document.getElementById("segundoApellido");
   localStorage.setItem("segundo apellido", segundoApellido.value);
   let inputFoto=document.getElementById("fotoPerfil");
   localStorage.setItem("foto", fotoPerfol.value);


      // Redirigir a la página principal
      if (inputNombre.classList.contains("is-valid") &&
      inputApellido.classList.contains("is-valid") &&
      inputel.classList.contains("is-valid")) {
        window.location.href = "index.html";
      } 
    });
});