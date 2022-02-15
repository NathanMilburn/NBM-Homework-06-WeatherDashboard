var myAPIKey = "830e2296d28e9adef700a0677aa768ed";
var citySelect = $('#area-search');
var searchBtn = $('#searchBtn');
var selectionHistory = $("#city-results");
var cityResults = $('#city-results');
var currentForecast = $("#city-name");
var currentTemp = $("#currentTemp");
var currentWind = $("#currentWind");
var currentHumidity = $("#currentHumidity");
var currentUVIndex = $("#currentUVIndex");
var dailyIcon = $(".dailyIcon");
var city = 'Seattle'
var queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${myAPIKey}`;

function pullWeatherData() {
fetch(queryURL)
.then(function(response) {
    return response.json();
})
.then(function(data) {
    var currentDate = new Date(data.dt * 1000).toLocaleDateString('en-US');
    console.log(data);
    // Presenting current weather conditions
    currentForecast.text(`${data.name} (${currentDate})`);
    currentTemp.text(`Temp: ${data.main.temp} ℉`);
    currentWind.text(`Wind: ${data.wind.speed} MPH`);
    currentHumidity.text(`Humidity: ${data.main.humidity} %`);
    });
}

pullWeatherData();

var pullLongLat = function(city) {
    var selectedPointAPI = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${myAPIKey}`;

    fetch(selectedPointAPI)
    .then(function (response) {
        console.log(response);
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        retrieveWeatherData(data[0].lat, data[0].lon);
        forecast.textContent = city + " ";
        // check local storage and add new city to list
        var oldHistory = JSON.parse(localStorage.getItem("city-results")) || [];
        if (!oldHistory.includes(data[0].name)) {
        oldHistory.push(data[0].name)
        localStorage.setItem("city-results", JSON.stringify(oldHistory));
        }
    });
};

var retrieveWeatherData = function(lat, lon) {
    var latLonURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${myAPIKey}`;
    // Error message for above URL: {"cod":401, "message": "Invalid API key. Please see http://openweathermap.org/faq#error401 for more info."} //

    fetch(latLonURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        
        // creating daily forecast
        pullWeatherData(data);
        // add weather card details here
        for (var i = 1; i < 6; i++) {
            var findCard = ".day" + i;
            var parentElement = document.querySelector(findCard);
            var ulChildEl = parentElement.querySelector(".Stats");
            var h4ChildEl = parentElement.querySelector(".card-body");
            var temp = ulChildEl.querySelector(".Temp");
            var wind = ulChildEl.querySelector(".Wind");
            var humidity = ulChildEl.querySelector(".Humidity");
            var date = h4ChildEl.querySelector(".Date");
            var icon = h4ChildEl.querySelector(".cardImg");
            timeOffset = data.timezone_offset;
            temp.textContent = "Temp: " + data.daily[i].temp.day;
            humidity.textContent = "Humidity: " + data.daily[i].humidity;
            wind.textContent = "Wind: " + data.daily[1].wind_speed;
            date.textContent = new Date((data.current.dt + timeOffset)*1000).toLocaleDateString();
            var weatherIcon = data.daily[i].weather[0].icon;
            icon.setAttribute("src", `https://openweathermap.org/img/w/${weatherIcon}.png`);
            // 404 error with above URL //
        };
 
    })
    .catch(function (error) {
        alert("Unable to find that city");
    });
};


var displayHistory = function(city) {
    var historyItem = document.createElement("li");
    historyItem.innerText=city;
    historyItem.addEventListener("click", function(event) {
        var city = event.target.innerText;
        getLongLat(city);
    });
    searchHistory.appendChild(historyItem);
};

var pullStorage = function() {
    var history = JSON.parse(localStorage.getItem("city-results")) || [];
    for (var i = 0; i < history.length; i++) {
        printHistory(history[i]);
    }
};
pullStorage();

// searchBtn.addEventListener("click", function() {
//     var selectCity = citySelect.value.trim();
//     pullLongLat(selectCity);
//     displayHistory(selectCity);
// });
// $('#searchBtn').on('click',pullWeatherData())

// Possible UV Info pull section //
// currentUVIndex.text(`UV: ${data.current.uvi}`);
//     var currentUV = function() {
//         if (data.current.uvi <= 2 ) {
//             currentUVIndex.classList.add("zeroRisk");
//         } else if (data.current.uvi <= 5) {
//             currentUVIndex.classList.add("lowRisk");
//         } else if (data.current.uvi <= 7) {
//             currentUVIndex.classList.add("mediumRisk");
//         } else if (data.current.uvi <= 10) {
//             currentUVIndex.classList.add("highRisk");
//         } else {
//             currentUVIndex.classList.add("veryHighRisk");
//         }
//         };
//         currentUV();