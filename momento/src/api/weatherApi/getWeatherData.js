import { getLocationData } from "../geolocation/getLocation";

export async function getWeatherData() {
  try {
    const res = await getLocationData();
    const key = import.meta.env.VITE_API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${res.lat}&lon=${res.long}&appid=${key}&units=metric`;
    // const apiUrl = `https://www.7timer.info/bin/api.pl?lon=${res.long}&lat=${res.lat}&product=civil&output=json`;

    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }
    const data = await response.json();

    if (data) {
      const temperature = data.main.temp;
      const tempFeels = data.main["feels_like"];
      const weather = data.weather[0].main;
      const windData = data.wind;
      const windSpeed = windData.speed;
      const cityName = data.name;

      return { temperature, tempFeels, weather, windSpeed, cityName };
    }

    return data;
  } catch (error) {
    console.warn("Ошибка при получении данных Weather API:", error);
  }
}
