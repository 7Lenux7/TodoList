document.addEventListener('DOMContentLoaded', () => {
    const addTaskButton = document.getElementById('addTaskButton');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const archivedList = document.getElementById('archivedList');
    const activeTab = document.getElementById('activeTab');
    const archivedTab = document.getElementById('archivedTab');
  
    // Массив для хранения активных задач
    let tasks = [];
    // Массив для хранения завершённых задач (архив)
    let archivedTasks = [];
  
    // Функция для рендеринга активных задач
    function renderActiveTasks() {
      taskList.innerHTML = ''; // Очищаем текущий список активных задач
      tasks.forEach((task, index) => {
        const taskElement = document.createElement('li');
        taskElement.innerHTML = `
          <span class="task-text ${task.status}">${task.text}</span>
          <div>
            <button class="in-progress" onclick="changeTaskStatus(${index}, 'in-progress')">В работе</button>
            <button class="pause" onclick="changeTaskStatus(${index}, 'pause')">Пауза</button>
            <button class="complete" onclick="completeTask(${index})">Завершить</button>
          </div>
        `;
        taskList.appendChild(taskElement);
      });
    }
  
    // Функция для рендеринга архива
    function renderArchivedTasks() {
      archivedList.innerHTML = ''; // Очищаем архив
      archivedTasks.forEach((task) => {
        const taskElement = document.createElement('li');
        taskElement.innerHTML = `<span class="task-text completed">${task.text}</span>`;
        archivedList.appendChild(taskElement);
      });
    }
  
    // Функция для изменения статуса задачи
    window.changeTaskStatus = (index, status) => {
      tasks[index].status = status;
      renderActiveTasks(); // Обновляем активные задачи
    };
  
    // Функция для завершения задачи и перемещения её в архив
    window.completeTask = (index) => {
      const completedTask = tasks.splice(index, 1)[0]; // Убираем задачу из активных
      completedTask.status = 'completed'; // Помечаем как завершённую
      archivedTasks.push(completedTask); // Добавляем задачу в архив
      renderActiveTasks(); // Перерисовываем активные задачи
      renderArchivedTasks(); // Перерисовываем архив
    };
  
    // Функция для добавления новой задачи
    addTaskButton.addEventListener('click', () => {
      const taskText = taskInput.value.trim();
  
      if (taskText) {
        tasks.push({
          text: taskText,
          status: 'todo', // Изначально задача без статуса
        });
  
        taskInput.value = ''; // Очищаем поле ввода
        renderActiveTasks(); // Обновляем список активных задач
      }
    });
  
    // Функции для переключения вкладок
    activeTab.addEventListener('click', () => {
      activeTab.classList.add('active');
      archivedTab.classList.remove('active');
      taskList.style.display = 'block';
      archivedList.style.display = 'none';
    });
  
    archivedTab.addEventListener('click', () => {
      archivedTab.classList.add('active');
      activeTab.classList.remove('active');
      taskList.style.display = 'none';
      archivedList.style.display = 'block';
    });
  
    // Изначальный рендер активных задач
    renderActiveTasks();
  });
  