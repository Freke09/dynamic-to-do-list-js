document.addEventListener("DOMContentLoaded", function() {
    
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    loadTasks();
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' indicates not to save again to Local Storage
    }

    function addTask(taskText, save = true) {
        if(taskText === undefined){
            taskText = taskInput.value.trim();
        }

        if(!taskText){
            alert("Please enter a task")
            return;
        } else {
            const li = document.createElement('li');
            li.textContent = taskText;

            const button = document.createElement('button');
            button.textContent = "Remove";
            button.classList.add('remove-btn');

            button.addEventListener('click', () => {
                taskList.removeChild(li)

                const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
                const updatedTasks = storedTasks.filter(task => task !== taskText);
                localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            });

            li.appendChild(button);
            taskList.appendChild(li);
            taskInput.value = '';
        }

        if (save) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }
        
    }
    addButton.addEventListener('click', () => addTask());

    taskInput.addEventListener('keypress', function(event) {
        if(event.key === "Enter"){
            addTask();
        }
    });
    
});