function searchedCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search");
  getTemperature(city);
}

function showTemperature(response) {
  let h2 = document.querySelector("h2");
  let temperature = Math.round(response.data.main.temp);
  h2.innerHTML = `${temperature}°C`;
  let weather = document.querySelector("h3");
  weather.innerHTML = response.data.weather[0].main;
  let h4 = document.querySelector("h4");
  let feelsLikeTemperature = Math.round(response.data.main.feels_like);
  h4.innerHTML = `Feels like: ${feelsLikeTemperature}°C`;
  let icon = document.querySelector(".weather-icon");
  let iconUrl = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
  console.log(iconUrl);
  icon.innerHTML = `<img src="${iconUrl}"></img>`;
  let cityTitle = document.querySelector("h1");
  let city = document.querySelector("#city-search");
  cityTitle.innerHTML =
    city.value.charAt(0).toUpperCase() + city.value.slice(1);
}

function getTemperature(city) {
  let cityApi = city.value;
  let units = "metric";
  let apiKey = "8402ccd9e55983fce71eeeaa1d2bd1fc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityApi}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchedCity);

function showGeolocation(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML =
    response.data.name.charAt(0).toUpperCase() + response.data.name.slice(1);
  let h2 = document.querySelector("h2");
  let temperature = Math.round(response.data.main.temp);
  h2.innerHTML = `${temperature}°C`;
  let weather = document.querySelector("h3");
  weather.innerHTML = response.data.weather[0].main;
  let h4 = document.querySelector("h4");
  let feelsLikeTemperature = Math.round(response.data.main.feels_like);
  h4.innerHTML = `Feels like: ${feelsLikeTemperature}°C`;
  let icon = document.querySelector(".weather-icon");
  let iconUrl = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
  console.log(iconUrl);
  icon.innerHTML = `<img src="${iconUrl}"></img>`;
}

function getCoords(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "8402ccd9e55983fce71eeeaa1d2bd1fc";
  let units = "metric";
  let coordsApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(coordsApiUrl).then(showGeolocation);
}

function geolocalize() {
  navigator.geolocation.getCurrentPosition(getCoords);
}

let geolocalizationButton = document.querySelector(".geolocation-button");
geolocalizationButton.addEventListener("click", geolocalize);
