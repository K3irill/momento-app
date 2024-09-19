import "./todo.layout.scss";
import clearAllSvg from "../../../assets/clear-allSVG.svg";
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
      const newTask = { title };
      addTaskToLocalStorage(newTask);
      taskListEl.append(createTask(title));
      taskFormInput.value = ""; 
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

function createTask(title) {
  const taskItem = document.createElement("li");
  const taskCheckbox = document.createElement("input");
  taskCheckbox.setAttribute("type", "checkbox");
  const taskTitle = document.createElement("label");
  taskTitle.textContent = title;

  taskCheckbox.addEventListener("change", () => {
    if (taskCheckbox.checked) {
      taskTitle.classList.add("modal__completed-task");
    } else {
      taskTitle.classList.remove("modal__completed-task");
    }
  });

  addElementsToBlock(taskItem, [taskCheckbox, taskTitle]);

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
    taskListEl.append(createTask(task.title));
  });
}
