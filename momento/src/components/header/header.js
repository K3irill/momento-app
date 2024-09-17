import "./header.scss";
import { getWeatherData } from "../../api/weatherApi/getWeatherData";

export async function renderHeader() {
  const header = document.createElement("header");
  header.classList.add("header");

  header.appendChild(createLinksElement());

  const metricItem = await createMetricItem();
  header.appendChild(metricItem);

  await getWeatherData();
  return header;
}

function createLinksElement() {
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

  return linksEl;
}

async function createMetricItem() {
  const metricBlock = document.createElement("div");
  metricBlock.classList.add("header__metric-block");

  try {
    const cityName = await getCityName();
    const weatherIcon = await getWeatherIcon();
    const temperature = await getTemperature();

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

async function getCityName() {
  return "Krasnodar";
}

async function getWeatherIcon() {
  return `<svg width="30px" height="30px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" stroke="#ffffff">

<g id="SVGRepo_bgCarrier" stroke-width="0"/>

<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

<g id="SVGRepo_iconCarrier">

<path fill="#ffffff" d="M512 704a192 192 0 1 0 0-384 192 192 0 0 0 0 384zm0 64a256 256 0 1 1 0-512 256 256 0 0 1 0 512zm0-704a32 32 0 0 1 32 32v64a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 768a32 32 0 0 1 32 32v64a32 32 0 1 1-64 0v-64a32 32 0 0 1 32-32zM195.2 195.2a32 32 0 0 1 45.248 0l45.248 45.248a32 32 0 1 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm543.104 543.104a32 32 0 0 1 45.248 0l45.248 45.248a32 32 0 0 1-45.248 45.248l-45.248-45.248a32 32 0 0 1 0-45.248zM64 512a32 32 0 0 1 32-32h64a32 32 0 0 1 0 64H96a32 32 0 0 1-32-32zm768 0a32 32 0 0 1 32-32h64a32 32 0 1 1 0 64h-64a32 32 0 0 1-32-32zM195.2 828.8a32 32 0 0 1 0-45.248l45.248-45.248a32 32 0 0 1 45.248 45.248L240.448 828.8a32 32 0 0 1-45.248 0zm543.104-543.104a32 32 0 0 1 0-45.248l45.248-45.248a32 32 0 0 1 45.248 45.248l-45.248 45.248a32 32 0 0 1-45.248 0z"/>

</g>

</svg>`;
}

async function getTemperature() {
  return 19;
}
