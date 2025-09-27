class Task {
    constructor(id, text, completed = false) {
        this.id = id;
        this.text = text;
        this.completed = completed;
    }
}

class TaskList {
    constructor(type) {
        this.type = type;
        this.tasks = this.loadTasks();
        this.container = document.getElementById(`${type}-tasks`);
        this.form = document.getElementById(`${type}-form`);
        this.setupEventListeners();
        this.render();
        this.checkDayChange();
    }

    loadTasks() {
        const tasksJSON = localStorage.getItem(`tasks_${this.type}`);
        return tasksJSON ? JSON.parse(tasksJSON).map(task => new Task(task.id, task.text, task.completed)) : [];
    }

    saveTasks() {
        localStorage.setItem(`tasks_${this.type}`, JSON.stringify(this.tasks));
    }

    checkDayChange() {
        const lastCheck = localStorage.getItem('lastCheck');
        const now = new Date();
        const currentDate = now.toISOString();

        if (lastCheck) {
            const lastCheckDate = new Date(lastCheck);
            const hasDayChanged = this.hasDayChangedSinceLastCheck(lastCheckDate, now);

            if (hasDayChanged) {
                // Solo reinicia el estado de completado, mantiene las tareas
                this.tasks = this.tasks.map(task => ({...task, completed: false}));
                this.saveTasks();
            }
        }

        localStorage.setItem('lastCheck', currentDate);
    }

    hasDayChangedSinceLastCheck(lastCheck, now) {
        // Verifica si ha pasado la medianoche entre la última comprobación y ahora
        const lastDay = lastCheck.getDate();
        const currentDay = now.getDate();
        
        // Si estamos en un día diferente y la hora actual es posterior a medianoche
        return lastDay !== currentDay && now.getHours() >= 0;
    }

    addTask(text) {
        const task = new Task(Date.now().toString(), text);
        this.tasks.push(task);
        this.saveTasks();
        this.render();
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
        this.render();
    }

    toggleTask(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.render();
        }
    }

    createTaskElement(task) {
        const taskElement = document.createElement('div');
        taskElement.className = `task-item ${task.completed ? 'completed' : 'pending'}`;
        
        taskElement.innerHTML = `
            <div class="task-content">
                <span>${task.text}</span>
            </div>
            <div class="task-actions">
                <button class="btn btn-delete" onclick="event.stopPropagation(); ${this.type}Tasks.deleteTask('${task.id}')">
                    Eliminar
                </button>
                <button class="btn btn-toggle" onclick="event.stopPropagation(); ${this.type}Tasks.toggleTask('${task.id}')">
                    ${task.completed ? 'Deshacer' : 'Completar'}
                </button>
            </div>
        `;
        
        return taskElement;
    }

    render() {
        this.container.innerHTML = '';
        this.tasks.forEach(task => {
            this.container.appendChild(this.createTaskElement(task));
        });
    }

    setupEventListeners() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = e.target.querySelector('input');
            const text = input.value.trim();
            
            if (text) {
                this.addTask(text);
                input.value = '';
            }
        });

        // Comprobar el cambio de día cada minuto
        setInterval(() => {
            this.checkDayChange();
        }, 60000); // 60000 ms = 1 minuto
    }
}

// Inicializar las listas de tareas
const morningTasks = new TaskList('morning');
const nightTasks = new TaskList('night');

// Hacer las instancias disponibles globalmente
window.morningTasks = morningTasks;
window.nightTasks = nightTasks;