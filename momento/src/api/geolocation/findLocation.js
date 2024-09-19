export function findLocation() {
  return new Promise((resolve) => {
    const savedLocation = localStorage.getItem("userLocation");

    if (savedLocation) {
      resolve(JSON.parse(savedLocation));
    } else if (!navigator.geolocation) {
      console.warn(
        "Ваш браузер не поддерживает геолокацию. Используются данные по умолчанию."
      );
      resolve({ long: 38.976, lat: 45.0448 });
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }

    function success(position) {
      const { longitude, latitude } = position.coords;
      const location = { long: longitude, lat: latitude };
      localStorage.setItem("userLocation", JSON.stringify(location));
      resolve(location);
    }

    function error(err) {
      console.warn(
        "Геолокация не разрешена или не может быть определена. Используются данные по умолчанию."
      );
      resolve({ long: 38.976, lat: 45.0448 });
    }
  });
}
