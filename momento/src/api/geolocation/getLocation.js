import { findLocation } from "./findLocation";

export async function getLocationData() {
  try {
    const location = await findLocation();
    console.log("Ваше местоположение:", location);
    return location;
  } catch (error) {
    console.error("Ошибка при получении местоположения:", error);
  }
}
