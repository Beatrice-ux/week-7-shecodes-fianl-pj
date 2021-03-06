


function formDate(timestamp){
    let date=new Date(timestamp);
    let hours=date.getHours();
    let minutes=date.getMinutes();
    let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let day=days[date.getDay()];
    
    return(`${day} ${hours}:${minutes}`);
}

function formatDay(timestamp){
    let date= new Date(timestamp*1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
}


function displayForecast(response) {
    let forecast=response.data.daily;
    let forecastElement=document.querySelector("#forecast");

    let forecastHTML=`<div class="row">`;
    forecast.forEach(function(forecastDay,index){
    if (index < 6) {
        forecastHTML=forecastHTML+
        `
    <div class="col-2">
            <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
                <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="42" />
                    <div class="weather-forecast-temperatures">
                        <span class="weather-forecast-temperature-max"> ${Math.round(forecastDay.temp.max)}° </span>
                        <span class="weather-forecast-temperature-min"> ${Math.round(forecastDay.temp.min)}° </span>
                    </div>
    </div>
    `;
    }
    });
    
    forecastHTML=forecastHTML + `</div>`;
    forecastElement.innerHTML=forecastHTML;
    
}
function getForecest(coordinates){
    
    console.log(coordinates);
    let apiKey="a3b981fcdb00e192a7a49927e31c8d54";
    let apiUrl=`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayForecast);
    
}

function showTemperature(response){
    let placeElement=document.querySelector("#place");
    let temperatureElement=document.querySelector("#temperature");
    let descriptionElement=document.querySelector("#description");
    let humidityElement=document.querySelector("#humidity");
    let windElement=document.querySelector("#wind");
    let dateElement=document.querySelector("#date");
    let iconElement=document.querySelector("#icon");
    placeElement.innerHTML=response.data.name;

    celciusTemp=response.data.main.temp;
    temperatureElement.innerHTML=Math.round(celciusTemp);
    descriptionElement.innerHTML=response.data.weather[0].description;
    humidityElement.innerHTML=response.data.main.humidity;
    windElement.innerHTML=Math.round(response.data.wind.speed);
    dateElement.innerHTML= formDate(response.data.dt*1000)
    iconElement.setAttribute("src",`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

    getForecest(response.data.coord);

}

function searchCity(city){
    let apiKey="a3b981fcdb00e192a7a49927e31c8d54";
    let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    axios.get(apiUrl).then(showTemperature);

}


function connectSearch(event){
    event.preventDefault();
    let cityinputElement=document.querySelector("#city-input");
    
    searchCity(cityinputElement.value);
}
 



let form=document.querySelector("#search-form");
form.addEventListener("submit",connectSearch);




searchCity("Hong Kong");
