var myAPIKey = "830e2296d28e9adef700a0677aa768ed";
var citySelect = document.querySelector('#area-search');
var selectionHistory = document.querySelector("#city-results");
var cityResults = document.querySelector('#city-results');
var currentForecast = document.querySelector("#city-name");
var currentTemp = document.querySelector("#currentTemp");
var currentWind = document.querySelector("#currentWind");
var currentHumidity = document.querySelector("#currentHumidity");
var currentUVIndex = document.querySelector("#currentUVIndex");
var today = moment().format('L');
var dailyIcon = document.querySelector(".dailyIcon");
var timeOffset;
// var city = citySelect.val();
var city = 'Seattle'
var queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myAPIKey}`;

function pullWeatherData() {
fetch(queryURL)
.then(function(response) {
    return response.json();
})
.then(function(data) {
    console.log(data);
});

}

$('#searchBtn').on('click',pullWeatherData())