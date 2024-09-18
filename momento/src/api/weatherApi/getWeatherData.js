import { getLocationData } from "../geolocation/getLocation";

export async function getWeatherData() {
  try {
    const res = await getLocationData();
    const key = "4e7abf6d86f62ca04e25c37928982420";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${res.lat}&lon=${res.long}&;`//appid=${key}&units=metric`
    // const apiUrl = `https://www.7timer.info/bin/api.pl?lon=${res.long}&lat=${res.lat}&product=civil&output=json`;

    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }
    const data = await response.json();

    console.log(data);
    if (data) {
      const temperature = data.main.temp;
      const tempFeels = data.main.temp["feels_like"];
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