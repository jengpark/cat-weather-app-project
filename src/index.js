let now = new Date();
let days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = ('0' + now.getMinutes()).slice(-2);

let dayTime = document.querySelector("#day-time");
dayTime.innerHTML = `${day} ${hours}:${minutes}`;

function convertCelsiusLink(event) {
  event.preventDefault();
  let celsiusTemp = document.querySelector("#current-temp");
  let currentTemp = document.querySelector("#current-temp");
  let tempConversion = currentTemp.innerHTML;
  celsiusTemp.innerHTML = `${Math.round(((tempConversion - 32) * 5) / 9)}°C`;
}
let celsiusLink = document.querySelector("#celsiusLink");
celsiusLink.addEventListener("click", convertCelsiusLink);

function temperaturefahrenheitLink(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let fahrenheitTemp = document.querySelector("#current-temp");
  let feelsLike = document.querySelector("#feels-like");
  let humidity = document.querySelector("#humidity");
  let windspeed = document.querySelector("#windspeed");
  let description = document.querySelector("#weather-description");
  document.querySelector("#cityName").innerHTML = response.data.name;
  fahrenheitTemp.innerHTML = currentTemp;
  feelsLike.innerHTML = Math.round(response.data.main.feels_like);
  humidity.innerHTML = response.data.main.humidity;
  windspeed.innerHTML = Math.round(response.data.wind.speed);
  description.innerHTML = response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "0523df1bb58e895c347086de47bedb0f";
  let unit = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(temperaturefahrenheitLink);
}

function searchButton(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function getCoordinates(position) {
  let apiKey = "0523df1bb58e895c347086de47bedb0f";
  let unit = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(temperaturefahrenheitLink);
}
navigator.geolocation.getCurrentPosition(getCoordinates);


function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(getCoordinates);
  }


let form = document.querySelector("form");
form.addEventListener("submit", searchButton);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("San Diego");