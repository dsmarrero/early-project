//api: https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects

// obtiene el número del proyecto desde la URL
const consultaUrl = new URLSearchParams(window.location.search);

const numeroProject = consultaUrl.get("id"); //almacena el número que aparece en la URL en numeroProject (1,2,3,4)

let projects = []; //un array vacío donde almacenar los datos de la API
async function getData() {
  try {
    const response = await fetch("https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects"); //recopila los datos de la API
    projects = await response.json(); //almacena los datos de la API en projects
                        

    //esto es para modificar el proyecto en grande
    const projectActual = projects.find((project) => project.uuid === numeroProject); //selecciona el proyecto con el id que se muestra en la URL
      document.querySelector(".title-project").textContent = projectActual.name;
      document.querySelector(".subtitle-project").textContent = projectActual.description;
      document.querySelector(".date").textContent = projectActual.completed_on;
      document.querySelector(".project-description").textContent = projectActual.content;
      document.querySelector(".project-main-img").src = projectActual.image;
      document.querySelector(".project-main-img").alt = projectActual.name;
      document.querySelector(".project-description").textContent = projectActual.content;

      //esto es para modificar las tarjetas pequeñas
    const otherProjects=projects.filter((project) => project.uuid !== numeroProject); //esto quita el proyecto actual del array y almacena el resto en otherProjects
    const listaOtros = document.querySelector("#container-tarjetas"); //apuntamos al contenedor de las tarjetas en el html y lo almacenamos en listaOtros
  
     listaOtros.innerHTML = ""; //vacía el contenedor
    otherProjects.forEach((project) => {
      //crea la estructura de la tarjeta
      const card = `<article class="card">
          <img src="${project.image}" alt="${project.name}" class="card-img" />
          <div class="card-body">
            <h4>${project.name}</h4>
            <p>${project.description}</p>
            <a href="projects.html?id=${project.uuid}" class="learn-more">Learn more</a>
          </div>
        </article>`;

      // mete la tarjeta en el contenedor
      listaOtros.innerHTML += card;
    });
  
  }
     
  catch (error) {
    console.log("An error has occurred");
  }
}
getData(); //si no se pone esto, la web no hace nada


//lógica de la hamburguesa
// const burger = document.querySelector("#burger");
// const menu = document.querySelector("#nav-menu");

// burger.addEventListener("click", () => {
//   menu.classList.toggle("active");
// });

//lógica del formulario
function sendForm() {
    //captura los elementos del DOM
    const nameInput = document.querySelector('input[placeholder="Enter your full name"]');
    const emailInput = document.querySelector('input[placeholder="Enter your email address"]');
    const phoneInput = document.querySelector('input[placeholder="Enter your phone number"]');
    const messageInput = document.querySelector('textarea');

    //captura los mensajes de error
    const errorName = document.getElementById("errorName");
    const errorEmail = document.getElementById("errorEmail");
    const errorPhone = document.getElementById("errorPhone");
    const errorMessage = document.getElementById("errorMessage");
    const errorSubmit = document.getElementById("errorSubmit");

    let isValid = true;

    //validación del nombre
    if (nameInput.value.trim().length < 3) {
        nameInput.classList.add("input-error");
        errorName.hidden = false;
        isValid = false;
    } else {
        nameInput.classList.remove("input-error");
        errorName.hidden = true;
    }

    //validación del email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        emailInput.classList.add("input-error");
        errorEmail.hidden = false;
        isValid = false;
    } else {
        emailInput.classList.remove("input-error");
        errorEmail.hidden = true;
    }

    //validación del teléfono
    if (phoneInput.value.trim() === "") {
        phoneInput.classList.add("input-error");
        errorPhone.hidden = false;
        isValid = false;
    } else {
        phoneInput.classList.remove("input-error");
        errorPhone.hidden = true;
    }

    //validación del mensaje
    if (messageInput.value.trim().length < 5) {
        messageInput.classList.add("input-error");
        errorMessage.hidden = false;
        isValid = false;
    } else {
        messageInput.classList.remove("input-error");
        errorMessage.hidden = true;
    }

    //submit final
    if (!isValid) {
        errorSubmit.hidden = false;
    } else {
        errorSubmit.hidden = true;
        alert("Thank you! Your form has been sent successfully!!");
        
        //muestra los datos en consola
        const formData = {
            Name: nameInput.value.trim(),  //el .trim quita los espacios accidentales antes y después de la info introducida
            Email: emailInput.value.trim(),
            Phone: phoneInput.value.trim(),
            Message: messageInput.value.trim(),
          };
    console.log(formData);
        }
}

//esto oculta los errores al escribir
const inputs = document.querySelectorAll(".contact-form input, .contact-form textarea");

inputs.forEach(input => {
    input.addEventListener("input", () => {
        //quita el borde rojo
        input.classList.remove("input-error");
        
        //busca el mensaje de error que está justo después del input
        const errorMsg = input.nextElementSibling;
        if (errorMsg && errorMsg.classList.contains("errorForm")) {
            errorMsg.hidden = true;
        }
        
        //oculta el error general de abajo al empezar a corregir
        document.getElementById("errorSubmit").hidden = true;
    });
});

