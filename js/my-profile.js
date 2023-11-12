const username = sessionStorage.getItem("username") || localStorage.getItem("username");
const email = document.getElementById("email");
let inputName = document.getElementById("nombre");
let nameValidation = document.getElementById("nameValidation");
let inputSurname = document.getElementById("apellido");
let surnameValidation = document.getElementById("surnameValidation");
let inputTel = document.getElementById("telefono");
let telValidation = document.getElementById("telValid");
let inputMiddleName = document.getElementById("middleName");
let input2ndSurname = document.getElementById("surname2");


document.addEventListener("DOMContentLoaded", () => {
    email.value = username;
    const nombre = localStorage.getItem("nombre");
    inputName.value = nombre;
    const apellido = localStorage.getItem("apellido");
    inputSurname.value = apellido;
    const telefono = localStorage.getItem("telefono");
    inputTel.value = telefono;
    const middleName = localStorage.getItem("middle-name");
    inputMiddleName.value = middleName;
    const surname2 = localStorage.getItem("second-surname");
    input2ndSurname.value = surname2;

    const fileInput = document.getElementById('foto');
    const profileImage = document.getElementById('img');

    // Cargar la imagen de perfil desde el almacenamiento local al cargar la página, si está disponible
    const storedImage = localStorage.getItem('profileImage');
    if (storedImage) {
        profileImage.src = storedImage;
    }

    fileInput.addEventListener('change', (e) => {
        if (e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const imageData = e.target.result;
                profileImage.src = imageData;
                localStorage.setItem('profileImage', imageData); // Almacena los datos de la imagen en el almacenamiento local
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    });

    //VALIDACION Y Almacenamiento del usario en el localstorage
    const form = document.getElementById("perfil");
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        //input name
        if (inputName.value === "") {
            inputName.classList.remove("is-valid");
            inputName.classList.add("is-invalid");

            nameValidation.classList.remove("valid-feedback");
            nameValidation.classList.add("invalid-feedback");

            nameValidation.innerHTML = "Por favor, ingrese su nombre.";
        } else {
            inputName.classList.remove("is-invalid");
            inputName.classList.add("is-valid");

            nameValidation.classList.remove("invalid-feedback");
            nameValidation.classList.add("valid-feedback");
            nameValidation.innerHTML = "";
        }
        localStorage.setItem("nombre", inputName.value);

        //input apellido

        if (inputSurname.value === "") {
            inputSurname.classList.remove("is-valid");
            inputSurname.classList.add("is-invalid");

            surnameValidation.classList.remove("valid-feedback");
            surnameValidation.classList.add("invalid-feedback");

            surnameValidation.innerHTML = "Por favor, ingrese su apellido.";
        } else {
            inputSurname.classList.remove("is-invalid");
            inputSurname.classList.add("is-valid");

            surnameValidation.classList.remove("invalid-feedback");
            surnameValidation.classList.add("valid-feedback");
            surnameValidation.innerHTML = "";
        }
        localStorage.setItem("apellido", inputSurname.value);


        //input telefono

        if (inputTel.value === "") {
            inputTel.classList.remove("is-valid");
            inputTel.classList.add("is-invalid");

            telValidation.classList.remove("valid-feedback");
            telValidation.classList.add("invalid-feedback");

            telValidation.innerHTML = "Por favor, ingrese su teléfono.";
        } else if (isNaN(inputTel.value)) {
            inputTel.classList.remove("is-valid");
            inputTel.classList.add("is-invalid");

            telValidation.classList.remove("valid-feedback");
            telValidation.classList.add("invalid-feedback");

            telValidation.innerHTML = "tipee en formato numero por favor";
        } else {
            inputTel.classList.remove("is-invalid");
            inputTel.classList.add("is-valid");

            telValidation.classList.remove("invalid-feedback");
            telValidation.classList.add("valid-feedback");
            telValidation.innerHTML = "";
        }
        localStorage.setItem("telefono", inputTel.value);


        // Datos no obligatorios pero que se almacenan
        localStorage.setItem("middle-name", inputMiddleName.value);
        localStorage.setItem("second-surname", input2ndSurname.value);
    });
});