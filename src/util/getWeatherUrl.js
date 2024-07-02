const apiKey = import.meta.env.VITE_API_KEY;

export const getWeatherUrl = (url, param) => {
  return `https://api.openweathermap.org/data/2.5${url}?q=${param}&appid=${apiKey}&units=metric`;
};
