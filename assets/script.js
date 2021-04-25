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

// 5 day elements


var pastSearchBtn = document.querySelector(".pastSearch");

// <div class="col-2 day1">
//           <div>
//             <h4 class="date1">Date</h4>
//           </div>
//           <div class="icon1"></div>
//           <div>
//             <p>Temp: <span class="temp1"></span></p>
//           </div>
//           <div>
//             <p>Wind: <span class="wind1"></span></p>
//           </div>
//           <div>
//             <p>Humidity: <span class="humidity1"></span></p>
//           </div>
//         </div>


// collect city entered into search bar for API fetch call
$(".searchBtn").on("click", function () {
  var wantCity = citySearch.value;
  currentCity.textContent = wantCity;
  // currentDate.textContent =;
  console.log(wantCity);
  // local storage
  localStorage.setItem("prvSearch1", wantCity);
  // var pastSearch = document.createElement("button");
  fetch(
    "http://api.openweathermap.org/geo/1.0/direct?q=" + wantCity + "&appid=2719aefbd0c2d8924e8efd5f26306318"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      return fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" + data[0].lat.toString() + "&lon=" + data[0].lon.toString() + "&units=imperial&exclude=minutely,hourly,alerts&appid=2719aefbd0c2d8924e8efd5f26306318"
      );
    })
    .then(function (weather) {
      return weather.json();
    })
    .then(function (test) {
      console.log(test);
    });

  // fetch ("https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude=minutely,hourly,alerts&appid=49e7d1f6cfdc32ff53e27623841fb5cb")
  // .then(function(response) {
  //   return response.json();
  // })
  // .then(function(data) {
  //   console.log(data);
  // });
});

// Populate dashboard with information for today

// Populate 5day forecast with desired city results

// Add buttons to reference previously searched cities

// api key
// 2719aefbd0c2d8924e8efd5f26306318
// fetch (
// "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=49e7d1f6cfdc32ff53e27623841fb5cb")
//   .then(function(response) {
//     return response.json();
//   })
//   .then(function(data) {
//     console.log(data);
//   })
