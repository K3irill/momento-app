import "./header.scss";
import { getWeatherData } from "../../api/weatherApi/getWeatherData";
import { weatherIcons } from "./weatherIcon";
import { getWeatherIcon } from "./weatherIcon";
import { linksModal } from "../modals/links.modal";

export async function renderHeader() {
  //getting weather data
  const weatherData = await getWeatherData();
  console.log(weatherData);
  
  //
  const header = document.createElement("header");
  header.classList.add("header");
  
  const modalLinks = linksModal();

  const metricItem = await createMetricItem(weatherData);
  header.appendChild(createLinksElement(modalLinks));
  header.appendChild(metricItem);


  header.prepend(modalLinks)
  return header;
}

function createLinksElement(modal) {
  const linksEl = document.createElement("div");
  linksEl.classList.add("header__linksElement");

  const linksSVG = document.createElement("img");
  linksSVG.src = "/src/assets/linksSVG.svg";
  linksSVG.classList.add("header__linksElement_img");

  const linksTitle = document.createElement("p");
  linksTitle.classList.add("header__linksElement_title");
  linksTitle.textContent = "Links";

  linksEl.appendChild(linksSVG);
  linksEl.appendChild(linksTitle);

  linksEl.addEventListener("click", () => {
    modal.classList.toggle("modal_invisible");
  });

  return linksEl;
}

async function createMetricItem(res) {
  const metricBlock = document.createElement("div");
  metricBlock.classList.add("header__metric-block");

  try {
    const cityName = res.cityName;
    const weatherIcon = await getWeatherIcon(res.weather, weatherIcons);
    console.log(getWeatherIcon(res.weather, weatherIcons));

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

    metricStat.appendChild(metricCurrentStat);
    metricStat.appendChild(metricDegree);
    metricBlock.appendChild(metricStat);
    metricBlock.appendChild(metricCity);
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    metricBlock.textContent = "Не удалось загрузить данные";
  }

  return metricBlock;
}
