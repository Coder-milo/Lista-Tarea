let tareas = [];

function agregarTarea() {
  const input = document.getElementById('entradaTarea');
  const descripcion = input.value.trim();
  if (descripcion !== '') {
    tareas.push({ descripcion, completada: false });
    input.value = '';
    renderizarTareas();
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
    checkbox.onclick = () => alternarEstado(index);

    const span = document.createElement('span');
    span.textContent = tarea.descripcion;
    if (tarea.completada) span.classList.add('completada');

    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = '🗑️';
    botonEliminar.onclick = () => eliminarTarea(index);

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(botonEliminar);
    lista.appendChild(li);
  });
}
document.getElementById('entradaTarea').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') agregarTarea();
});
