var myAPIKey = "830e2296d28e9adef700a0677aa768ed";
var citySelect = $('#area-search');
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
//         console.log("checkUV works")
//         };
//         currentUV();