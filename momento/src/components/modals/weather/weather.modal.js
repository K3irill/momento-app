import "./weather.layout.scss";
import { parentModal } from "../../ui/modal";
import { createBtn } from "../../ui/modal";
import moreSVG from "../../../assets/moreSVG.svg";
import { getWeatherIcon, weatherIcons } from "../../header/weatherIcon";
import { addElementsToBlock } from "../../header/header";
import { getWeatherData } from "../../../api/weatherApi/getWeatherData";

export async function weatherModal() {
  const modalWeather = parentModal("modal__weather");
  modalWeather.classList.add("modal__weather");
  const modalBtnMore = createBtn(moreSVG, "modal__btn-def");

  const weatherInfoBlock = document.createElement("div");
  weatherInfoBlock.classList.add("modal__weather-info-block");

  const loadingMessage = document.createElement("p");
  loadingMessage.textContent = "Loading weather data...";
  weatherInfoBlock.appendChild(loadingMessage);
  modalWeather.appendChild(weatherInfoBlock);

  try {
    const weatherData = await getWeatherData();
    console.log(weatherData);

    weatherInfoBlock.innerHTML = "";

    //----------------------------------------------\\
    const cityInfoBlock = document.createElement("div");
    cityInfoBlock.classList.add("modal__city-info-block");

    const cityTitle = document.createElement("h2");
    cityTitle.classList.add("modal__weather_city-title");
    cityTitle.textContent = weatherData?.cityName || "Unknown City";

    const weatherSubtitle = document.createElement("p");
    weatherSubtitle.classList.add("modal__weather_city-subtitle");
    weatherSubtitle.textContent = weatherData?.weather || "Unknown";

    addElementsToBlock(cityInfoBlock, [cityTitle, weatherSubtitle]);

    //-----------------------------------------------------------\\
    const weatherTempBlock = document.createElement("div");
    weatherTempBlock.classList.add("modal__weather-temp-block");

    const weatherImg = document.createElement("span");
    weatherImg.innerHTML =
      (await getWeatherIcon(weatherData?.weather, weatherIcons)) || "";
    weatherImg.classList.add("modal__weather_img");

    const weatherTemp = document.createElement("h2");
    weatherTemp.classList.add("modal__weather_temp");
    weatherTemp.textContent = weatherData?.temperature
      ? `${weatherData.temperature}°C`
      : "N/A";

    addElementsToBlock(weatherTempBlock, [weatherImg, weatherTemp]);

    //-----------------------------------------------------------\\
    const weatherFeelsBlock = document.createElement("div");
    weatherFeelsBlock.classList.add("modal__weather-feels-block");

    const feelsLikeEl = document.createElement("p");
    feelsLikeEl.classList.add("modal__weather_feels-like");
    feelsLikeEl.textContent = weatherData?.tempFeels
      ? `Feels like: ${weatherData.tempFeels.toFixed(0)}°C`
      : "Feels like: N/A";

    const windEl = document.createElement("p");
    windEl.classList.add("modal__weather_wind");
    windEl.textContent = weatherData?.windSpeed
      ? `Wind: ${weatherData.windSpeed} m/s`
      : "Wind: N/A";

    addElementsToBlock(weatherFeelsBlock, [feelsLikeEl, windEl]);

    addElementsToBlock(weatherInfoBlock, [weatherTempBlock, weatherFeelsBlock]);
    addElementsToBlock(modalWeather, [
      cityInfoBlock,
      modalBtnMore,
      weatherInfoBlock,
    ]);
  } catch (error) {
    weatherInfoBlock.innerHTML = "<p>Failed to load weather data</p>";
    console.error("Error fetching weather data:", error);
  }

  return modalWeather;
}
