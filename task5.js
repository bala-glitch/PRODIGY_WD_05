const apiKey = '3d1f703092d9485699f54326241607'; // Replace with your WeatherAPI key

function fetchWeather() {
    const location = document.getElementById('locationInput').value;
    if (location) {
        getWeatherData(location);
    } else {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                getWeatherDataByCoords(lat, lon);
            });
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    }
}

function getWeatherData(location) {
    fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => alert('Error fetching weather data: ' + error));
}

function getWeatherDataByCoords(lat, lon) {
    fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => alert('Error fetching weather data: ' + error));
}

function displayWeather(data) {
    if (data.error) {
        alert('Error: ' + data.error.message);
        return;
    }
    const weatherDiv = document.getElementById('weather');
    weatherDiv.innerHTML = `
        <div class="weather-info">
            <h2>Weather in ${data.location.name}, ${data.location.country}</h2>
            <p>Temperature: ${data.current.temp_c}°C</p>
            <p>Weather: ${data.current.condition.text}</p>
            <p>Humidity: ${data.current.humidity}%</p>
            <p>Wind Speed: ${data.current.wind_kph} kph</p>
            <img src="${data.current.condition.icon}" alt="Weather icon">
        </div>
    `;
}
