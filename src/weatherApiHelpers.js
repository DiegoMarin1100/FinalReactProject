const APIKEY = '41a2600e28dd091bcdab5ec4399adaf7';

export const getWeatherData = (city) => {
  return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric`)
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
      throw error; // Rethrow the error to handle it in the component if needed
    });
};

export const getForecastData = (city) => {
  return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKEY}&units=metric`)
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
      throw error; // Rethrow the error to handle it in the component if needed
    });
};