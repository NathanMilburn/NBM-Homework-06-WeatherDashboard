var myAPIKey = "830e2296d28e9adef700a0677aa768ed";
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