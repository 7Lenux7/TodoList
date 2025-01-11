document.addEventListener('DOMContentLoaded', () => {
  const addTaskButton = document.getElementById('addTaskButton');
  const taskInput = document.getElementById('taskInput');
  const taskList = document.getElementById('taskList');
  const archivedList = document.getElementById('archivedList');
  const activeTab = document.getElementById('activeTab');
  const archivedTab = document.getElementById('archivedTab');

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
    archivedTasks.forEach((task) => {
      const taskElement = document.createElement('li');
      taskElement.innerHTML = `<span class="task-text completed">${task.text}</span>`;
      archivedList.appendChild(taskElement);
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

  // Загрузка данных при загрузке страницы
  loadTasksFromLocalStorage();
  renderActiveTasks();
  renderArchivedTasks();
});
document.addEventListener('DOMContentLoaded', () => {
  // Получаем ссылку на кнопку переключения темы
  const themeToggleButton = document.getElementById('themeToggleButton');
  
  // Проверяем сохранённую тему в localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.body.classList.toggle('dark', savedTheme === 'dark');
    document.querySelector('.container').classList.toggle('dark', savedTheme === 'dark');
    themeToggleButton.textContent = savedTheme === 'dark' ? 'Светлая тема' : 'Тёмная тема';
  }

  // Обработчик переключения темы
  themeToggleButton.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark');
    document.querySelector('.container').classList.toggle('dark');
    themeToggleButton.textContent = isDark ? 'Светлая тема' : 'Тёмная тема';

    // Сохраняем выбор пользователя
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
});
