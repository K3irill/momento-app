export function findLocation() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      console.warn(
        "Ваш браузер не поддерживает геолокацию. Используются данные по умолчанию."
      );
      resolve({ long: 37.6173, lat: 55.7558 });
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }

    function success(position) {
      const { longitude, latitude } = position.coords;
      resolve({ long: longitude, lat: latitude });
    }

    function error(err) {
      console.warn(
        "Геолокация не разрешена или не может быть определена. Используются данные по умолчанию."
      );
      resolve({ long: 37.6173, lat: 55.7558 });
    }
  });
}
