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

function temperatureFahrenheitLink(response) {
  let currentTemp = document.querySelector("#current-temp");
  let feelsLike = document.querySelector("#feels-like");
  let humidity = document.querySelector("#humidity");
  let windspeed = document.querySelector("#windspeed");
  let description = document.querySelector("#weather-description");
  let icon = document.querySelector("#weather-icon");
  document.querySelector("#cityName").innerHTML = response.data.name;

  fahrenheitTemp = response.data.main.temp;

  currentTemp.innerHTML = Math.round(fahrenheitTemp);
  feelsLike.innerHTML = Math.round(response.data.main.feels_like);
  humidity.innerHTML = response.data.main.humidity;
  windspeed.innerHTML = Math.round(response.data.wind.speed);
  description.innerHTML = response.data.weather[0].description;
  icon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}

function searchCity(city) {
  let apiKey = "0523df1bb58e895c347086de47bedb0f";
  let unit = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(temperatureFahrenheitLink);
}

function searchButton(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function convertCelsiusLink(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");

  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let celsiusTemp = ((fahrenheitTemp - 32) * 5) / 9;
  currentTemp.innerHTML = Math.round(celsiusTemp);
}

function convertfahrenheitLink(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  currentTemp.innerHTML = Math.round(fahrenheitTemp);
}

let fahrenheitTemp = null;

let form = document.querySelector("form");
form.addEventListener("submit", searchButton);

searchCity("San Diego");

let celsiusLink = document.querySelector("#celsiusLink");
celsiusLink.addEventListener("click", convertCelsiusLink);

let fahrenheitLink = document.querySelector("#fahrenheitLink");
fahrenheitLink.addEventListener("click", convertfahrenheitLink);
