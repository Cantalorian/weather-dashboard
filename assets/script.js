var citySearch = document.querySelector(".searchInput");
var searchBtn = document.querySelector(".searchBtn");

// previous search elements
var prvSearch1 = document.querySelector(".prvSearch1");
var prvSearch2 = document.querySelector(".prvSearch2");
var prvSearch3 = document.querySelector(".prvSearch3");
var prvSearch4 = document.querySelector(".prvSearch4");
var prvSearch5 = document.querySelector(".prvSearch5");

// current day search elements
var currentCity = document.querySelector(".searchCity");
var currentDate = document.querySelector(".currentDate");
var currentTemp = document.querySelector(".currentTemp");
var currentWind = document.querySelector(".currentWind");
var currentHumidity = document.querySelector(".currentHumidity");
var uv = document.querySelector(".currentUv");
var mainIcon = document.querySelector(".weatherIcon");
console.log(mainIcon);

var pastSearchBtn = document.querySelector(".pastSearch");
// 5 day elements

function parseWeatherData(data) {
  var fiveDayBlock = "<h4>5-Day Forecast:</h4>";
  var fiveDay = document.querySelector(".fiveDay");
  for (var i = 0; i < 6; i++) {
    if (i === 0) {
      mainIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png">`;
      var dailyTemp = (data.daily[0].temp.min + data.daily[0].temp.max)/2.;
      currentTemp.innerHTML = dailyTemp.toPrecision(4) + " °F";
      currentWind.innerHTML = data.daily[0].wind_speed + " MPH";
      currentHumidity.innerHTML = data.daily[0].humidity + " %";
      uv.innerHTML = data.daily[0].uvi;
    } else {
      var temp = (data.daily[i].temp.min + data.daily[i].temp.max) /2;
      var wind = data.daily[i].wind_speed;
      var humidity = data.daily[i].humidity;
      var weatherIcon = data.daily[i].weather[0].icon;
      var forecast = `<div class="col-2">
                <div>
                  <h4 class="date1"></h4>
                </div>
                <div></div>
                <img src="http://openweathermap.org/img/wn/${weatherIcon}@2x.png">
                <div>
                  <p>Temp: <span>${temp.toPrecision(4)} °F</span></p>
                </div>
                <div>
                  <p>Wind: <span>${wind} MPH</span></p>
                </div>
                <div>
                  <p>Humidity: <span>${humidity} %</span></p>
                </div>
              </div>`;
      fiveDayBlock += forecast;
    }
  }
  fiveDay.innerHTML = fiveDayBlock;
}

// collect city entered into search bar for API fetch call
$(".searchBtn").on("click", function () {
  var wantCity = citySearch.value.charAt(0).toUpperCase() + citySearch.value.slice(1);
  currentCity.textContent = wantCity;
  // currentDate.textContent =;
  console.log(wantCity);
  // local storage
  localStorage.setItem("prvSearch1", wantCity);
  // var pastSearch = document.createElement("button");
  fetch(
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
      wantCity +
      "&appid=2719aefbd0c2d8924e8efd5f26306318"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      return fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          data[0].lat.toString() +
          "&lon=" +
          data[0].lon.toString() +
          "&units=imperial&exclude=minutely,hourly,alerts&appid=2719aefbd0c2d8924e8efd5f26306318"
      );
    })
    .then(function (weather) {
      return weather.json();
    })
    .then(function (data) {
      console.log(data);
      parseWeatherData(data);
    });

});

// Populate dashboard with information for today

// Populate 5day forecast with desired city results

// Add buttons to reference previously searched cities

