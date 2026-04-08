//api: https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects

// obtiene el número del proyecto desde la URL
const consultaUrl = new URLSearchParams(window.location.search);

const numeroProject = consultaUrl.get("id"); //almacena el número que aparece en la URL en numeroProject (1,2,3,4)
// console.log(numeroProject);
//

//Petición a la API para obtener los datos de todos los proyectos SIN asincronía
// let projects = [];
// fetch ("https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects")
// .then ((response)=>{
//     if (!response.ok)
//         throw new Error ("Error al obtener los datos");
//     return response.json();
// })
// .then ((data)=>{
//      console.log (data);
//      projects= data;
// })
// .catch ((error)=>{
//     console.log (error);
// });
// //

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
  
    //continuamos aquí el resto del código
  
  }
     
  catch (error) {
    console.log("An error has occurred");
  }
}
getData(); //si no se pone esto, la web no hace nada
