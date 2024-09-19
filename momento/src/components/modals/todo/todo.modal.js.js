import "./todo.layout.scss";
import clearAllSvg from "/public/assets/clear-allSVG.svg";
import deleteSVG from "/public/assets/deleteSVG.svg";
import { addElementsToBlock } from "../../header/header";
import { parentModal } from "../../ui/modal";
import { createBtn } from "../../ui/modal";

export function tasksModal() {
  const modalTaskWrapper = parentModal("modal__tasks-wrap");

  const modalTaskBlock = document.createElement("div");
  modalTaskBlock.classList.add("modal__tasks");

  //------------------------------------------------\\
  const modalTaskTitleEl = document.createElement("h3");
  modalTaskTitleEl.classList.add("modal__title-tasks");
  modalTaskTitleEl.textContent = "Tasks";

  const modalTaskBtnClearAllEl = createBtn(
    clearAllSvg,
    "modal__btn-clear-all-tasks"
  );
  modalTaskBtnClearAllEl.setAttribute("title", "Clear all tasks!");
  modalTaskBtnClearAllEl.addEventListener("click", () => {
    const clearConfirmation = confirm(
      "All your tasks will be deleted. Are you sure?"
    );
    if (clearConfirmation) {
      taskListEl.innerHTML = "";
      localStorage.removeItem("tasks");
    }
  });
  //________________________________________________\\
  const taskForm = document.createElement("form");
  taskForm.classList.add("modal__tasks-form");

  const taskFormInput = document.createElement("input");
  taskFormInput.setAttribute("placeholder", "Here you may enter task");
  taskFormInput.classList.add("modal__tasks-input");
  //-----------------------------------------------\\

  const taskListEl = document.createElement("ul");
  taskListEl.classList.add("modal__tasks-list");

  loadTasksFromLocalStorage(taskListEl);

  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = taskFormInput.value.trim();

    if (title) {
      const newTask = { title, completed: false };
      addTaskToLocalStorage(newTask);
      taskListEl.append(createTask(newTask));
      taskFormInput.value = "";
    } else {
      alert("Enter any text");
    }
  });

  addElementsToBlock(taskForm, [taskFormInput]);
  addElementsToBlock(modalTaskBlock, [
    taskForm,
    modalTaskTitleEl,
    modalTaskBtnClearAllEl,
    taskListEl,
  ]);
  addElementsToBlock(modalTaskWrapper, [modalTaskBlock]);

  return modalTaskWrapper;
}

function createTask(task) {
  const taskItem = document.createElement("li");
  taskItem.classList.add("modal__tasks-item");

  const taskCheckbox = document.createElement("input");
  taskCheckbox.setAttribute("type", "checkbox");
  taskCheckbox.checked = task.completed;

  const taskTitle = document.createElement("label");
  const taskDeleteBtn = createBtn(deleteSVG, "modal__tasks-delete-btn");
  taskDeleteBtn.setAttribute("title", "delete task");
  taskTitle.textContent = task.title;

  if (task.completed) {
    taskTitle.classList.add("modal__completed-task");
  }

  taskCheckbox.addEventListener("change", () => {
    updateTaskInLocalStorage(task.title, taskCheckbox.checked);

    if (taskCheckbox.checked) {
      taskTitle.classList.add("modal__completed-task");
    } else {
      taskTitle.classList.remove("modal__completed-task");
    }
  });

  taskDeleteBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    deleteTask(task.title, taskItem);
  });

  addElementsToBlock(taskItem, [taskCheckbox, taskTitle, taskDeleteBtn]);

  return taskItem;
}

function addTaskToLocalStorage(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasksFromLocalStorage(taskListEl) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => {
    taskListEl.append(createTask(task));
  });
}

function updateTaskInLocalStorage(title, completed) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks = tasks.map((task) => {
    if (task.title === title) {
      return { ...task, completed };
    }
    return task;
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(title, taskItem) {
  taskItem.remove();

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((task) => task.title !== title);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
