function formatDate(){
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
  let hours = ('0' + now.getHours()).slice(-2);
  let minutes = ('0' + now.getMinutes()).slice(-2);
  return `${day} ${hours}:${minutes}`;
}
 let dayTime = document.querySelector("#day-time");
 dayTime.innerHTML = formatDate();

 function temperatureFahrenheitLink(response) {
  let currentTemp = document.querySelector("#current-temp");
  let feelsLike = document.querySelector("#feels-like");
  let humidity = document.querySelector("#humidity");
  let windspeed = document.querySelector("#windspeed");
  let description = document.querySelector("#weather-description");
  let icon = document.querySelector("#weather-icon");
  let catImage = document.querySelector("#cat-images");
  let mainDescription = response.data.weather[0].main;
  document.querySelector("#cityName").innerHTML = response.data.name;

  fahrenheitTemp = response.data.main.temp;

  currentTemp.innerHTML = Math.round(fahrenheitTemp);
  feelsLike.innerHTML = Math.round(response.data.main.feels_like);
  humidity.innerHTML = response.data.main.humidity;
  windspeed.innerHTML = Math.round(response.data.wind.speed);
  description.innerHTML = response.data.weather[0].description;
  icon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  catImage.setAttribute("src", `images/${mainDescription}.jpg`);

  let coordinates = response.data.coord;
  let latitude = response.data.coord.lat;
  let longitude = response.data.coord.lon;
  getForecast(coordinates);
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

searchCity("San Diego");

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

let celsiusLink = document.querySelector("#celsiusLink");
celsiusLink.addEventListener("click", convertCelsiusLink);

let fahrenheitLink = document.querySelector("#fahrenheitLink");
fahrenheitLink.addEventListener("click", convertfahrenheitLink);

function forecastDate(timestamp){
  let now = new Date(timestamp*1000);
  let forecastDay = now.getDay();
  let days = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat'
  ];

  return days[forecastDay];
}

function displayForecast(response) {
  let dailyForecast = response.data.daily;
  let forecast = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  dailyForecast.forEach(function (forecastDay,index) {
    if (index < 5) {
      forecastHTML = 
        forecastHTML +
        `
      <div class="col-sm">
        <div class="card text-center" style="width:5rem;">
          <div class="card-body">
            <div class="forecastDays">${forecastDate(forecastDay.dt)}</div>
            <div class="forecastIcon">  
              <img 
                src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
               width="45" />
            </div>
            <div class="forecast-temp">
              <span class="forecast-temp-max"> <strong>${Math.round(forecastDay.temp.max)}°</strong> </span> |
              <span class="forecast-temp-min">${Math.round(forecastDay.temp.min)}°</span>
            </div>
          </div>
        </div>
      </div>
      `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
  }

function getForecast(coordinates) {
  let apiKey = "0523df1bb58e895c347086de47bedb0f";
  let unit = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayForecast); 
}
