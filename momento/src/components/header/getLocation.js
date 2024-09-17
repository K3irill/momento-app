import { findLocation } from "../../api/geolocation/findLocation";

export async function getLocationData() {
  try {
    const location = await findLocation();
    console.log("Ваше местоположение:", location);
    // Можно использовать location.long и location.lat
  } catch (error) {
    console.error("Ошибка при получении местоположения:", error);
  }
}

