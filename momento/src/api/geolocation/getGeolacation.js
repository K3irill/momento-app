// export function findLocation() {
//   return new Promise((resolve, reject) => {
//     if (!navigator.geolocation) {
//       reject("Ваш браузер не поддерживает геолокацию.");
//     } else {
//       navigator.geolocation.getCurrentPosition(success, error);
//     }

//     function success(position) {
//       const { longitude, latitude } = position.coords;
//       resolve({ long: longitude, lat: latitude });
//     }

//     function error(err) {
//       // Можно использовать err.code и err.message для более точной диагностики ошибок
//       const errorMessage = {
//         1: "Доступ к геолокации отклонён.",
//         2: "Невозможно определить местоположение.",
//         3: "Тайм-аут запроса геолокации.",
//       };
//       reject(errorMessage[err.code] || "Неизвестная ошибка геолокации.");
//     }
//   });
// }
