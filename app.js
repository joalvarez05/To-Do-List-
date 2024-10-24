// Creamos una clase, siempre las clases se crean al principio.

class Tarea {
    constructor(id, actividad, data = false) {
      this.id = id;
      this.actividad = actividad;
      this.data = data;
    }
  }
  
  // Una vez creado el la clase o el molde donde nosotros vamos a alojar nuestros datos, procedemos a crear algunas variables que me permitan recuperar elementos html y recuperar elementos de la base de datos, en este caso del Local Storage.
  let tareas = JSON.parse(localStorage.getItem("actividad")) || [];
  // let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
  let contenedorTarjetas = document.getElementById("contenedorTarjetas");
  // let contenedorTarjetas = document.getElementById("contenedorTarjetas");
  
  // Ahora creamos una funcion la cual consiste en agregar elementos dinamicos: primero pausamos el evento SUBMIT que trae por defecto el formulario. Luego recuperamos el input del formulario. luego de crearlo hacemos una condicion, donde si esta condicion es true procedemos a crear el objeto y a guardar en el localStorage como un objeto ese dato obtenido.
  agregarTarea = (event) => {
    // controlamos el submit del formulario.
    event.preventDefault();
    let tarea = document.getElementById("inpTarea").value;
  
    if (tarea.length > 4 && tarea.length < 25) {
      tareas.push(new Tarea(new Date().getTime(), tarea));
      localStorage.setItem("actividad", JSON.stringify(tareas));
      document.getElementById("inpTarea").value = "";
  
      listarTareas();
    } else if (tarea.length > 25) {
      alert(
        `Tu actividad debe contener menos de 25 caracteres. Intente de nuevo.`
      );
    } else {
      alert(`Tu actividad debe contener mas de 4 caracteres. Intente de nuevo.`);
    }
  };
  
  // Creamos una funcion que primero que nada borre el contenido que hay en el html ( en ese contenedor que llamemos obvio.). Esto se va a ejectar al principio.
  // Luego creamos un mapeo del array "tareas" con el fin de crear el elemento "div" en el html y ademas le agregamos los styles.
  // Luego creamos una variable donde va el contenido que ya hicimos en html, con un format string de modo que cuando lo llamemos vayamos actualizando esa tarea que se imprime. En este caso tenemos un span que tiene una tarea predefinida, vamos a cambiar el contenido del span y le vamos a pasar el valor del input.
  // luego  añadimos el contenido a ese contenedor que creamos anteriormente, es como que le metemos un contenedor adentro.
  // Luego llamamos al contenedor Tarjetas que es el contenedor padre y le agremaos el contenido que creamos recien, es decir le hacemos un append . le metemos el hijo al padre.
  // Para finalizar llamamos a la function, la cual se ejecuta cuando arranca el programa, pero al no haber datos para hacer correr la funcion solo limpia el html. Capaz se podria crear una funcion que solo haga esto, habria que probarlo.
  
  const listarTareas = () => {
    contenedorTarjetas.innerHTML = "";
  
    tareas.map((item) => {
      let contenido = document.createElement("div");
      contenido.classList =
        "col-10 col-md-8 align-items-center d-flex flex-column";
      let hijo = `<div class="card rounded-5 mt-3 w-75 dlt-div" >
                    <div
                      class="card-body d-flex justify-content-between align-items-center"
                    >
                      <span>${item.actividad}</span>
                      <button class="btn btn-danger btn-md dlt-button">X</button>
                    </div>
                  </div>`;
  
      contenido.innerHTML = hijo;
      contenedorTarjetas.append(contenido);
    });
  };
  listarTareas();
  
  // Ahora tenemos que a grandes rasgos hacer que el boton rojo, elimine la tarjeta del html.
  // Capturamos todos los botones de delete.
  // Cuando hay elementos,, se guardan como objetos en un array.
  // vamos a realizar un forEach al array creado y le decimos que a cada boton le agrege un escuchardor "click", y ejecute la funcion borrar cuando se haga click.
  // Funcion borrar recibe un evento como parametro, luego crea una variable a la cual le agrega ese evento(hace referencia al evento que la disparó), aplicandole target que es como decirle que el objetivo es ese elemento que disparo el evento bueno a ese vamos a darle masa. luego con el closeset es un metodo que sirve para buscar hacia arriba en la jerarquía de elementos (es decir, hacia los elementos padres).
  // Por lo tanto habremos capturado el primer elemento con la clase dlt-div que este por encima del dlt-button.
  // luego le aplicamos un remove a ese contenedor y se borra. Pero hay un tema porque no lo estoy borrando del localStorage.
   
  
  let eliminar = document.querySelectorAll(".dlt-button");
  
  eliminar.forEach((boton) => {
    boton.addEventListener("click", borrar);
  });
  
  function borrar(event) {
    let tarjeta = event.target.closest(".dlt-div");
  
    tarjeta.remove();
  }
  