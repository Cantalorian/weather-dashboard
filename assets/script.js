var citySearch = document.querySelector(".searchInput");
var searchBtn = document.querySelector(".searchBtn");
var today = moment();

// previous search elements
var prvSearches = document.querySelector(".pastSearch");

// current day search elements
var currentCity = document.querySelector(".searchCity");
var currentDate = document.querySelector(".currentDate");
var currentTemp = document.querySelector(".currentTemp");
var currentWind = document.querySelector(".currentWind");
var currentHumidity = document.querySelector(".currentHumidity");
var uv = document.querySelector(".currentUv");
var mainIcon = document.querySelector(".weatherIcon");

var pastSearchBtn = document.querySelector(".pastSearch");
// 5 day elements

var searches = [];

// var pastSearch = document.createElement("button");
function grabPrevSearches() {
  var previousSearches = "";
  var previousSearch = localStorage.getItem("previousSearches");
  if (previousSearch) {
    searches = JSON.parse(previousSearch);
    for (var i = 0; i < searches.length; i++) {
      // Add buttons to reference previously searched cities
      previousSearches += `<button id="lastSearch" class="col-3 prvSearch">${searches[i]}</button>`;
    }
  }
  prvSearches.innerHTML = previousSearches;
  $(".prvSearch").on("click", function (event) {
    search(event.target.textContent);
    currentCity.textContent = event.target.textContent;
    currentDate.textContent = today.format("dddd, MMMM Do YYYY");
  });
}
grabPrevSearches();

function setPreviousSearches(city) {
  if (searches.length === 5) {
    searches.shift();
    searches.push(city);
    localStorage.setItem("previousSearches", JSON.stringify(searches));
    grabPrevSearches();
  } else {
    searches.push(city);
    localStorage.setItem("previousSearches", JSON.stringify(searches));
  }
}

// Populate dashboard with information for today
function parseWeatherData(data) {
  var fiveDayBlock = "<h4>5-Day Forecast:</h4>";
  var fiveDay = document.querySelector(".fiveDay");
  for (var i = 0; i < 6; i++) {
    if (i === 0) {
      mainIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png">`;
      var dailyTemp = (data.daily[0].temp.min + data.daily[0].temp.max) / 2;
      currentTemp.innerHTML = dailyTemp.toPrecision(4) + " °F";
      currentWind.innerHTML = data.daily[0].wind_speed + " MPH";
      currentHumidity.innerHTML = data.daily[0].humidity + " %";
      var uviStyle = "";
      if (data.daily[0].uvi <= 2) {
        uviStyle = `<span class="green">${data.daily[0].uvi}</span>`;
      } else if (data.daily[0].uvi <= 7) {
        uviStyle = `<span class="yellow"><b>${data.daily[0].uvi}</b></span>`;
      } else {
        uviStyle = `<span class="red"><b>${data.daily[0].uvi}</b></span>`;
      }
      uv.innerHTML = uviStyle;
    } else {
      // Populate 5day forecast with desired city results
      var temp = (data.daily[i].temp.min + data.daily[i].temp.max) / 2;
      var wind = data.daily[i].wind_speed;
      var humidity = data.daily[i].humidity;
      var weatherIcon = data.daily[i].weather[0].icon;
      var thisDay = new Date(data.daily[i].dt * 1000).toLocaleDateString(
        "en-US"
      );
      var forecast = `<div class="col-2">
                <div>
                  <h4 class="date1">${thisDay}</h4>
                </div>
                <div></div>
                <img src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png">
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
function search(city) {
  // local storage
  setPreviousSearches(city);
  fetch(
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
      city +
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
      parseWeatherData(data);
    })
    .catch(function (error) {
      currentCity.textContent = "No City Found";
    });
}

$(".searchBtn").on("click", function () {
  var wantCity =
    citySearch.value.charAt(0).toUpperCase() + citySearch.value.slice(1);
  currentCity.textContent = wantCity;
  search(wantCity);
  citySearch.value = "";
  currentDate.textContent = today.format("dddd, MMMM Do YYYY");
});

$(".prvSearch").on("click", function (event) {
  currentCity.textContent = event.target.textContent;
  search(event.target.textContent);
  currentDate.textContent = today.format("dddd, MMMM Do YYYY");
});
