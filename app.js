// 82bc04523cfa3995aea237c0a31d77f3


// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
const weatherApi = {
    key: "82bc04523cfa3995aea237c0a31d77f3",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather"
}

let searchInputBox = document.querySelector('#input-box');
let clearBtn = document.querySelector("#btn");

searchInputBox.addEventListener('keypress', func);
clearBtn.addEventListener('click', refresh);

function refresh() {
    searchInputBox.value = '';
    document.body.style.backgroundImage = "url('img/clear.jpg')";

    let city = document.querySelector('#city');
    city.innerText = `City ,Country`;

    let temp = document.querySelector('#temp');
    temp.innerHTML = `0&deg;C`;

    let minmax = document.querySelector('#min-max');
    minmax.innerHTML = `0&deg;C (min) / 0&deg;C (max)`;

    let weatherType = document.querySelector('#weather');
    weatherType.innerText = `WeatherType`;

    let date = document.querySelector('#date');
    date.innerHTML = `Date Month (Day), Year.`;
}

function func(event) {
    if (event.keyCode == 13)
        console.log(searchInputBox.value);
    getWeatherReport(searchInputBox.value);
}

function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
        .then(weather => {
            return weather.json();
        }).then(showWeatherReport);
}

function showWeatherReport(weather) {
    console.log(weather);
    let city = document.querySelector('#city');
    city.innerText = `${weather.name},${weather.sys.country}`;

    let temp = document.querySelector('#temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    let minmax = document.querySelector('#min-max');
    minmax.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min) / ${Math.ceil(weather.main.temp_max)}&deg;C (max)`;

    let weatherType = document.querySelector('#weather');
    weatherType.innerText = `${weather.weather[0].main}`;


    if (weatherType.textContent == 'Haze') {
        document.body.style.backgroundImage = "url('img/clear.jpg'";
    } else if (weatherType.textContent == 'Clouds') {
        document.body.style.backgroundImage = "url('img/cloud.jpg'";
    } else if (weatherType.textContent == 'Rain') {
        document.body.style.backgroundImage = "url('img/rain.jpg'";
    } else if (weatherType.textContent == 'Snow') {
        document.body.style.backgroundImage = "url('img/snow.jpg'";
    } else if (weatherType.textContent == 'Thunderstorm') {
        document.body.style.backgroundImage = "url('img/thunderstorm.jpg'";
    } else if (weatherType.textContent == 'Sunny') {
        document.body.style.backgroundImage = "url('img/sunny.jpg'";
    }

    let date = document.querySelector('#date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);



}

function dateManage(arg) {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let year = arg.getFullYear();
    let month = months[arg.getMonth()];
    let date = arg.getDate();
    let day = days[arg.getDay()];

    return `${date} ${month} (${day}), ${year} `;
}