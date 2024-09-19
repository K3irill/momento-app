import { findLocation } from "./findLocation";

export async function getLocationData() {
  try {
    const location = await findLocation();
    return location;
  } catch (error) {
    console.error("Ошибка при получении местоположения:", error);
  }
}