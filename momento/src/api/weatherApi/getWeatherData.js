import { getLocationData } from "../geolocation/getLocation";

export async function getWeatherData() {
  try {
    const res = await getLocationData();

    const apiUrl = `https://www.7timer.info/bin/api.pl?lon=${res.long}&lat=${res.lat}&product=civil&output=json`;


    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Ошибка при получении данных с 7timer API:", error);
  }
}

getWeatherData().then((data) => {
  if (data) {
    console.log(data);

    const temperature = data.dataseries[0].temp2m;
    console.log(`Температура: ${temperature}°C`);
  }
});
