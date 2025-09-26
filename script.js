// Clases para gestionar las tareas
class Task {
    constructor(id, text, completed = false) {
        this.id = id;
        this.text = text;
        this.completed = completed;
    }
}

class TaskManager {
    constructor(type) {
        this.type = type; // 'morning' o 'night'
        this.tasks = this.loadTasks();
        this.checkAndResetDaily();
    }

    loadTasks() {
        const tasks = localStorage.getItem(`tasks_${this.type}`);
        return tasks ? JSON.parse(tasks) : [];
    }

    checkAndResetDaily() {
        const lastResetDate = localStorage.getItem('lastResetDate');
        const today = new Date().toLocaleDateString();

        if (lastResetDate !== today) {
            // Reiniciar todas las tareas
            this.tasks = this.tasks.map(task => ({
                ...task,
                completed: false
            }));
            this.saveTasks();
            localStorage.setItem('lastResetDate', today);
        }
    }

    saveTasks() {
        localStorage.setItem(`tasks_${this.type}`, JSON.stringify(this.tasks));
    }

    addTask(text) {
        const id = Date.now().toString();
        const task = new Task(id, text);
        this.tasks.push(task);
        this.saveTasks();
        return task;
    }

    removeTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
    }

    toggleTask(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
        }
    }
}

// Instancias de TaskManager para mañana y noche
const morningTasks = new TaskManager('morning');
const nightTasks = new TaskManager('night');

// Función para crear el elemento HTML de una tarea
function createTaskElement(task, manager) {
    const taskElement = document.createElement('div');
    taskElement.className = `task-item ${task.completed ? 'completed' : 'pending'}`;
    const deleteButton = window.isAdminView ? 
        `<button onclick="deleteTask('${task.id}', '${manager.type}')" class="delete-btn">Eliminar</button>` : '';
    
    taskElement.innerHTML = `
        <span>${task.text}</span>
        <div class="task-actions">
            ${deleteButton}
            <button onclick="toggleTask('${task.id}', '${manager.type}')" class="toggle-btn">
                ${task.completed ? 'Deshacer' : 'Completar'}
            </button>
        </div>
    `;
    return taskElement;
}

// Función para renderizar las tareas
function renderTasks(manager, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    manager.tasks.forEach(task => {
        container.appendChild(createTaskElement(task, manager));
    });
}

// Funciones globales para manejar eventos
window.toggleTask = function(id, type) {
    const manager = type === 'morning' ? morningTasks : nightTasks;
    manager.toggleTask(id);
    renderTasks(manager, `${type}-tasks`);
}

window.deleteTask = function(id, type) {
    const manager = type === 'morning' ? morningTasks : nightTasks;
    manager.removeTask(id);
    renderTasks(manager, `${type}-tasks`);
}

// Event listeners para los formularios (solo en vista admin)
if (window.isAdminView) {
    document.getElementById('morning-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('morning-task');
        if (input.value.trim()) {
            morningTasks.addTask(input.value.trim());
            renderTasks(morningTasks, 'morning-tasks');
            input.value = '';
        }
    });

    document.getElementById('night-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('night-task');
        if (input.value.trim()) {
            nightTasks.addTask(input.value.trim());
            renderTasks(nightTasks, 'night-tasks');
            input.value = '';
        }
    });
}

// Renderizar tareas al cargar la página
renderTasks(morningTasks, 'morning-tasks');
renderTasks(nightTasks, 'night-tasks');


