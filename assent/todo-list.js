// Elementos HTML
const inputTarea = document.querySelector("#nuevaTarea");
const botonAgregar = document.querySelector("#agregarTarea");
const listaTareas = document.querySelector("#listaTareas");
const totalTareas = document.querySelector("#totalTareas");
const tareasCompletadas = document.querySelector("#tareasCompletadas");

// Arreglo inicial de tareas
const tareas = [
    { id: 1, descripcion: "Comprar pan", completada: false },
    { id: 2, descripcion: "Estudiar JavaScript", completada: false },
    { id: 3, descripcion: "Hacer ejercicio", completada: false },
];

// Renderizar tareas
function renderizarTareas() {
    listaTareas.innerHTML = ""; // Limpiar lista

    // Agregar encabezados como fila separada
    const header = document.createElement("li");
    header.style.display = "flex";
    header.style.fontWeight = "bold";
    header.style.marginBottom = "10px";
    header.innerHTML = `
        <span style="width: 50px;">ID</span>
        <span style="flex: 1;">Tarea</span>
    `;
    listaTareas.appendChild(header);

    // Renderizar las tareas
    tareas.forEach((tarea, index) => {
        const li = document.createElement("li");
        li.style.display = "flex";
        li.style.alignItems = "center";
        li.style.marginBottom = "5px";
        li.className = tarea.completada ? "completed" : "";

        li.innerHTML = `
            <span style="width: 50px;">${index + 1}</span>
            <span 
                class="tarea" 
                style="flex: 1; text-decoration: ${tarea.completada ? "line-through" : "none"};">
                ${tarea.descripcion}
            </span>
            <button class="completada" onclick="cambiarEstado(${tarea.id})">Completada</button>
            <button onclick="eliminarTarea(${tarea.id})">Eliminar</button>
        `;
        listaTareas.appendChild(li);
    });

    // Actualizar contadores
    totalTareas.textContent = tareas.length;
    tareasCompletadas.textContent = tareas.filter((t) => t.completada).length;
}

// Agregar una tarea
botonAgregar.addEventListener("click", () => {
    const descripcion = inputTarea.value.trim();
    if (descripcion) {
        tareas.push({
            id: Date.now(), // ID único
            descripcion: descripcion,
            completada: false,
        });
        inputTarea.value = ""; // Limpiar input
        renderizarTareas();
    }
});

// Eliminar una tarea
function eliminarTarea(id) {
    const indice = tareas.findIndex((t) => t.id === id);
    if (indice !== -1) {
        tareas.splice(indice, 1);
        renderizarTareas();
    }
}

// Cambiar estado de una tarea
function cambiarEstado(id) {
    const tarea = tareas.find((t) => t.id === id);
    if (tarea) {
        tarea.completada = !tarea.completada; // Alternar el estado
        renderizarTareas(); // Volver a renderizar la lista
    }
}

// Inicializar la lista con las tareas existentes
renderizarTareas();






