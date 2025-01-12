document.addEventListener('DOMContentLoaded', () => {
  const addTaskButton = document.getElementById('addTaskButton');
  const taskInput = document.getElementById('taskInput');
  const taskList = document.getElementById('taskList');
  const archivedList = document.getElementById('archivedList');
  const activeTab = document.getElementById('activeTab');
  const archivedTab = document.getElementById('archivedTab');
  const themeToggleButton = document.getElementById('themeToggleButton');

  let tasks = [];
  let archivedTasks = [];

  // Сохранение задач в localStorage
  function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('archivedTasks', JSON.stringify(archivedTasks));
  }

  // Загрузка задач из localStorage
  function loadTasksFromLocalStorage() {
    const savedTasks = localStorage.getItem('tasks');
    const savedArchivedTasks = localStorage.getItem('archivedTasks');

    if (savedTasks) {
      tasks = JSON.parse(savedTasks);
    }

    if (savedArchivedTasks) {
      archivedTasks = JSON.parse(savedArchivedTasks);
    }
  }

  // Функция для рендеринга активных задач
  function renderActiveTasks() {
    taskList.innerHTML = '';
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
    archivedList.innerHTML = '';
    archivedTasks.forEach((task, index) => {
      const taskElement = document.createElement('li');
      taskElement.innerHTML = `
        <span class="task-text completed">${task.text}</span>
        <button class="delete" data-index="${index}">Удалить</button>
      `;
      archivedList.appendChild(taskElement);
    });

    // Добавление обработчиков событий для кнопок удаления
    const deleteButtons = archivedList.querySelectorAll('.delete');
    deleteButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        const taskIndex = parseInt(e.target.getAttribute('data-index'), 10);
        deleteArchivedTask(taskIndex);
      });
    });
  }

  // Функция для изменения статуса задачи
  window.changeTaskStatus = (index, status) => {
    tasks[index].status = status;
    saveTasksToLocalStorage(); // Сохраняем изменения
    renderActiveTasks();
  };

  // Функция для завершения задачи
  window.completeTask = (index) => {
    const completedTask = tasks.splice(index, 1)[0];
    completedTask.status = 'completed';
    archivedTasks.push(completedTask);
    saveTasksToLocalStorage(); // Сохраняем изменения
    renderActiveTasks();
    renderArchivedTasks();
  };

  // Функция для удаления задачи из архива
  function deleteArchivedTask(index) {
    archivedTasks.splice(index, 1); // Удаляем задачу из архива
    saveTasksToLocalStorage(); // Сохраняем изменения
    renderArchivedTasks(); // Обновляем список архива
  }

  // Функция для добавления новой задачи
  addTaskButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();

    if (taskText) {
      tasks.push({
        text: taskText,
        status: 'todo',
      });

      taskInput.value = '';
      saveTasksToLocalStorage(); // Сохраняем изменения
      renderActiveTasks();
    }
  });

  // Переключение вкладок
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

  // Переключение темы
  themeToggleButton.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark');
    document.querySelector('.container').classList.toggle('dark');
    const icon = isDark ? 'fas fa-sun' : 'fas fa-moon';
    themeToggleButton.innerHTML = `<i class="${icon}"></i>`; // Обновляем иконку
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  // Загрузка данных и темы при загрузке страницы
  loadTasksFromLocalStorage();
  renderActiveTasks();
  renderArchivedTasks();

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    themeToggleButton.innerHTML = '<i class="fas fa-sun"></i>';
  }
});
