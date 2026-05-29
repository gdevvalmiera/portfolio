const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

taskInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        addTaskBtn.click();
    }
});

function createTask(taskText) {
    const li = document.createElement('li');
    const deleteBtn = document.createElement('button');

    li.textContent = taskText;

    li.addEventListener('click', function () {
        li.classList.toggle('completed');
        saveTasks();
    });

    deleteBtn.textContent = 'X';

    deleteBtn.addEventListener('click', function () {
        li.remove();
        saveTasks();
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

addTaskBtn.addEventListener('click', function () {
    const taskText = taskInput.value;

    if (taskText === '') {
        alert('Ieraksti uzdevumu!');
        return;
    }

    createTask(taskText);
    saveTasks();

    taskInput.value = '';
});

function saveTasks() {
    const tasks = [];

    document.querySelectorAll('#taskList li').forEach(function (li) {
        tasks.push(li.firstChild.textContent);
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(function (taskText) {
        createTask(taskText);
    });
}

loadTasks();