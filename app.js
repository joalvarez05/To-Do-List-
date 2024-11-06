// ?CLASE
class Tarea {
  constructor(id, text, done = false) {
    this.id = id;
    this.text = text;
    this.done = done;
  }
}

let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

let contenedorTarjetas = document.getElementById("contenedor-tarjetas");

//? FUNCIONES - Creamos el primer CRUD

//CREATE - C
const agregarTarea = (event) => {
  // ! 1-Controlar formulario evento SUBMIT
  event.preventDefault();

  // ! 2-Capturar el VALOR
  let tarea = document.querySelector("#textTarea").value;
  // console.log(tarea);

  // ! 3-VALIDACIONES
  if (tarea.length > 4 && tarea.length < 15) {
    //Llevar al ARRAY y crear INSTANCIA del objeto
    tareas.push(new Tarea(new Date().getTime(), tarea)); //? INSTANCIA

    //Guardar en Base de Datos
    localStorage.setItem("tareas", JSON.stringify(tareas));

    //Limpiar el FORM
    document.querySelector("#textTarea").value = "";

    //Imprimir de nuevo las tarjetas
    listarTareas();
  } else {
    alert(`${tarea} debe tener como minimo 4 letras!`);
  }
};

//READ - R
const listarTareas = () => {
  //! Limpiar el contenedor
  contenedorTarjetas.innerHTML = "";

  //! Crear la TARJETA-CARD
  tareas.map((item) => {
    //1er NODO
    let columna = document.createElement("div");
    columna.classList = "col-12 col-md-6 m-2";

    //2do NODO
    let tarjeta = `<div class="card">
  <div
    class="card-body d-flex justify-content-between align-items-center"
  >
    <span class="${
      item.done ? "text-decoration-line-through" : ""
    }" onclick="marcarTarea(${item.id})">${item.text}</span>
    <button class="btn input-button" onclick="eliminarTarjeta(${
      item.id
    })">X</button>
  </div>
</div>`;

    //Unir NODOS
    columna.innerHTML = tarjeta;

    contenedorTarjetas.append(columna);
  });

  //! PENDIENTES
  let tareasPendientes = tareas.filter((item) => {
    return item.done === false;
  });

  //Tareas pendientes
  document.getElementById("tareas_pendientes").innerText =
    tareasPendientes.length;

  //Total
  document.getElementById("tareas_total").innerText = tareas.length;
};

//UPDATE - U
const marcarTarea = (id) => {
  let index = tareas.findIndex((item) => {
    return item.id == id;
  });

  //Invertir el DONE
  tareas[index].done = !tareas[index].done;

  //Actuallizadar DB
  localStorage.setItem("tareas", JSON.stringify(tareas));

  //Listar
  listarTareas();
};

//DELETE - D
const eliminarTarjeta = (id) => {
  //recorrer el ARRAY
  let index = tareas.findIndex((item) => {
    console.log(item.id);
    return item.id == id;
  });
  console.log(index);

  //Eliminar tarea - splice
  tareas.splice(index, 1);

  //Actuallizadar DB
  localStorage.setItem("tareas", JSON.stringify(tareas));

  //Listar
  listarTareas();
};

listarTareas();
