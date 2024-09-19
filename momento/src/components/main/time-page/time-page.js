import "./time-page.scss";
import { createTime } from "./time";
import { createDate } from "./data";
import { addElementsToBlock } from "../../header/header";
import { timeOfDay } from "../photoBytime";
import { tasksModal } from "../../modals/todo/todo.modal.js";

export function renderTimePage() {
  const timePageContainer = document.createElement("div");
  timePageContainer.classList.add("time-page");

  const currentTime = new Date();
  const backgroundImageUrl = getCurrentIbg(timeOfDay, currentTime);
  timePageContainer.style.backgroundImage = `url(${backgroundImageUrl})`;

  const timeEl = createTime();
  const dateEl = createDate();

  updateTime(timeEl, dateEl, timePageContainer);
  setInterval(() => updateTime(timeEl, dateEl, timePageContainer), 1000);

  const taskEl = document.createElement("h2");
  taskEl.classList.add("time-page__tasks-title");
  taskEl.textContent = "Tasks";

  const tasksModalEl = tasksModal();

  taskEl.addEventListener("click", (event) => {
    event.stopPropagation();
  
    tasksModalEl.classList.toggle("modal_invisible");
  
    if (!tasksModalEl.classList.contains("modal_invisible")) {
      document.addEventListener("click", closeTasksModalOnClickOutside);
    } else {
      document.removeEventListener("click", closeTasksModalOnClickOutside);
    }
  });
  
  function closeTasksModalOnClickOutside(event) {
    if (!tasksModalEl.contains(event.target)) {
      tasksModalEl.classList.add("modal_invisible");
      document.removeEventListener("click", closeTasksModalOnClickOutside);
    }
  }

  addElementsToBlock(timePageContainer, [timeEl, dateEl, taskEl, tasksModalEl]);
  return timePageContainer;
}

function updateTime(timeEl, dateEl, timePageContainer) {
  const now = new Date();
  const timeString = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const day = now.toLocaleDateString("ru-RU", { day: "numeric" });
  const month = now.toLocaleDateString("ru-RU", { month: "long" });
  const weekday = now.toLocaleDateString("ru-RU", { weekday: "long" });

  const dateString = `${day} ${format(month)}, ${weekday}`;

  timeEl.textContent = timeString;
  dateEl.textContent = dateString;

  const backgroundImageUrl = getCurrentIbg(timeOfDay, now);
  timePageContainer.style.backgroundImage = `url(${backgroundImageUrl})`;
}

function getCurrentIbg(arr, currentTime) {
  const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

  for (let element of arr) {
    const [start, end] = element.time_range.map((time) => {
      const [hours, minutes] = time.split(":").map(Number);
      return hours * 60 + minutes;
    });

    if (
      (currentMinutes >= start && currentMinutes < end) ||
      (start > end && (currentMinutes >= start || currentMinutes < end))
    ) {
      return element.url;
    }
  }

  return arr[0].url;
}

function format(word) {
  let month = word.split("");
  if (month[month.length - 1] === "ь" || month[month.length - 1] === "й") {
    month[month.length - 1] = "я";
  } else {
    month[month.length - 1] = "а";
  }
  return month.join("");
}
