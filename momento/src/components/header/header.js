import "./header.scss";
import { getWeatherData } from "../../api/weatherApi/getWeatherData";
import { weatherIcons } from "./weatherIcon";
import { getWeatherIcon } from "./weatherIcon";
import { linksModal } from "../modals/links/links.modal.js";
import { weatherModal } from "../modals/weather/weather.modal.js";

export function addElementsToBlock(block, elements) {
  elements.forEach((element) => block.append(element));
}

export async function renderHeader() {
  //getting weather data
  const weatherData = await getWeatherData();

  //
  const header = document.createElement("header");
  header.classList.add("header");

  const modalLinks = linksModal();
  const modalWeather = await weatherModal();

  const metricItem = await createMetricItem(weatherData);
  metricItem.addEventListener("click", (event) => {
    event.stopPropagation();
    modalWeather.classList.toggle("modal_invisible");

    if (!modalWeather.classList.contains("modal_invisible")) {
      document.addEventListener("click", closeWeatherModalOnClickOutside);
    } else {
      document.removeEventListener("click", closeWeatherModalOnClickOutside);
    }
  });

  addElementsToBlock(header, [
    createLinksElement(modalLinks),
    metricItem,
    modalLinks,
    modalWeather,
  ]);
  return header;

  function closeWeatherModalOnClickOutside(event) {
    if (
      !modalWeather.contains(event.target) &&
      !metricItem.contains(event.target)
    ) {
      modalWeather.classList.add("modal_invisible");
      document.removeEventListener("click", closeWeatherModalOnClickOutside);
    }
  }
}

function createLinksElement(modal) {
  const linksEl = document.createElement("div");
  linksEl.classList.add("header__linksElement");

  const linksSVG = document.createElement("img");
  linksSVG.src = "/assets/linksSVG.svg";
  linksSVG.classList.add("header__linksElement_img");

  const linksTitle = document.createElement("p");
  linksTitle.classList.add("header__linksElement_title");
  linksTitle.textContent = "Links";

  addElementsToBlock(linksEl, [linksSVG, linksTitle]);

  linksEl.addEventListener("click", (event) => {
    event.stopPropagation();

    modal.classList.toggle("modal_invisible");

    if (!modal.classList.contains("modal_invisible")) {
      document.addEventListener("click", closeModalOnClickOutside);
    } else {
      document.removeEventListener("click", closeModalOnClickOutside);
    }
  });

  function closeModalOnClickOutside(event) {
    if (!modal.contains(event.target) && !linksEl.contains(event.target)) {
      modal.classList.add("modal_invisible");
      document.removeEventListener("click", closeModalOnClickOutside);
    }
  }

  return linksEl;
}

async function createMetricItem(res) {
  const metricBlock = document.createElement("div");
  metricBlock.classList.add("header__metric-block");

  try {
    const cityName = res.cityName;
    const weatherIcon = await getWeatherIcon(res.weather, weatherIcons);

    const temperature = res.temperature.toFixed(0);

    const metricCity = document.createElement("p");
    metricCity.classList.add("header__metric-block_label");
    metricCity.textContent = cityName;

    const metricStat = document.createElement("div");
    metricStat.classList.add("header__metric-block_stat");

    const metricCurrentStat = document.createElement("div");
    metricCurrentStat.classList.add("header__metric-block_curnt-stat");
    metricCurrentStat.innerHTML = weatherIcon;

    const metricDegree = document.createElement("span");
    metricDegree.classList.add("header__metric-block_degree");
    metricDegree.textContent = `${temperature}`;

    addElementsToBlock(metricStat, [metricCurrentStat, metricDegree]);
    addElementsToBlock(metricBlock, [metricStat, metricCity]);
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    metricBlock.textContent = "Не удалось загрузить данные";
  }

  return metricBlock;
}
