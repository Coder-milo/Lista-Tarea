let tareas = [];

function agregarTarea() {
  const input = document.getElementById('entradaTarea');
  const descripcion = input.value.trim();
  if (descripcion !== '') {
    tareas.push({ descripcion, completada: false });
    input.value = '';
    renderizarTareas();
  } else {
    alert('Por favor, ingresa una descripción para la tarea.');
  }
}

function alternarEstado(index) {
  tareas[index].completada = !tareas[index].completada;
  renderizarTareas();
}

function eliminarTarea(index) {
  tareas.splice(index, 1);
  renderizarTareas();
}

function renderizarTareas() {
  const lista = document.getElementById('listaTareas');
  lista.innerHTML = '';

  const pendientes = tareas.filter(t => !t.completada);
  const completadas = tareas.filter(t => t.completada);

  [...pendientes, ...completadas].forEach((tarea, index) => {
    const li = document.createElement('li');
    li.className = 'tarea';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = tarea.completada;
    checkbox.id = `tarea-${index}`; // Añadimos un id único por tarea
    checkbox.onclick = () => alternarEstado(index);

    const label = document.createElement('label');
    label.setAttribute('for', checkbox.id); // Asignamos el id al label

    const span = document.createElement('span');
    span.textContent = tarea.descripcion;
    if (tarea.completada) span.classList.add('completada');

    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = '🗑️';
    botonEliminar.onclick = () => eliminarTarea(index);

    label.appendChild(span); // Ponemos la descripción de la tarea dentro del label
    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(botonEliminar);
    lista.appendChild(li);
  });
}

document.getElementById('entradaTarea').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault(); // Evitar que se recargue la página al presionar "Enter"
    agregarTarea();
  }
});
