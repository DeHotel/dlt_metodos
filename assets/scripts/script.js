let tareas = [];
let id = 0;
const input = document.getElementById("input");
const boton = document.getElementById("btnAgregar");
const spanTotal = document.getElementById("spanTotal");
const spanCompletadas = document.getElementById("spanCompletadas");
const spanPendientes = document.getElementById("spanPendientes");
const listaTareas = document.getElementById("listaTareas");
const listaTareas2 = document.getElementById("listaTareas2");

function agregarTarea() {
  const valor = input.value;
  if (valor !== "") {
    const nuevaTarea = {
      id: (id += 1),
      tarea: valor,
      completada: false,
    };
    tareas.push(nuevaTarea);
    input.value = "";
    muestraLista();
  }
}

boton.addEventListener("click", agregarTarea);
const color1 = "#fff";
const color2 = "#000";
let color = 0;
function muestraLista() {
  let html = "";
  tareas.forEach((tarea) => {
    html += `<tr>
     <td><span>${tarea.id}</span></td>
     <td><span style=${tarea.completada ? "" : "color:red;"}>${
      tarea.tarea
    }</span></td>
    <td class="td-botones"><input type="checkbox" id="check" onchange="completarTarea(${
      tarea.id
    })" ${tarea.completada ? "checked" : ""} />
    <button onclick='eliminarTarea(${tarea.id})'>
    <span class="material-symbols-outlined">delete</span></button>
    <button ${tarea.completada ? "disabled" : ""} onclick='editarTarea(${
      tarea.id
    })'><span class="material-symbols-outlined">edit</span></button></td>
  </tr>`;
  });
  listaTareas.innerHTML = html;

  contar();
}

function eliminarTarea(tareaId) {
  tareas = tareas.filter((tarea) => tarea.id !== tareaId);
  muestraLista();
}

function editarTarea(tareaId) {
  const tarea = tareas.find((tarea) => tarea.id === tareaId);
  if (tarea) {
    const nuevaTarea = prompt("Editar", tarea.tarea);
    if (nuevaTarea !== null && nuevaTarea.trim() !== "") {
      tarea.tarea = nuevaTarea.trim();
      muestraLista();
    }
  }
}

function completarTarea(tareaId) {
  const tarea = tareas.find((tarea) => tarea.id === tareaId);
  if (tarea) {
    tarea.completada = !tarea.completada;
  }
  muestraLista();
}

function contar() {
  const total = tareas.length;
  const completadas = tareas.filter((tareas) => tareas.completada).length;
  const pendientes = total - completadas;

  spanTotal.innerHTML = total;
  spanCompletadas.innerHTML = completadas;
  spanPendientes.innerHTML = pendientes;
}
