


function formDate(timestamp){
    let date=new Date(timestamp);
    let hours=date.getHours();
    let minutes=date.getMinutes();
    let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let day=days[date.getDay()];

    return(`${day} ${hours}:${minutes}`);
}

function displayForecast (){
    let forecastElement=document.querySelector("#forecast");
    let days=["Tue", "Wed","Thu","Fri","Sat","Sun"];
    let forecastHTML=`<div class="row">`;
    days.forEach(function(day){
        forecastHTML=forecastHTML+
        `
        <div class="col-2">
            <div class="weather-forecast-date">${day}</div>
                <img src="http://openweathermap.org/img/wn/50d@2x.png" alt="" width="42" />
                    <div class="weather-forecast-temperatures">
                        <span class="weather-forecast-temperature-max"> 18° </span>
                        <span class="weather-forecast-temperature-min"> 12° </span>
                    </div>
            </div>
        </div>
    `;
    });
    
    forecastHTML=forecastHTML+ `</div>`;
    forecastElement.innerHTML=forecastHTML;
    console.log (forecastHTML);
}

function showTemperature(response){
    console.log(response.data);
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
 
function showFahrenheit (event){
    event.preventDefault();
    let temperatureElement=document.querySelector("#temperature");
    let fahrenheitTemp=(celciusTemp* 9) / 5 + 32;
    temperatureElement.innerHTML=Math.round(fahrenheitTemp);
}

function showCelcius (event){
    event.preventDefault();
    let temperatureElement=document.querySelector("#temperature");
    temperatureElement.innerHTML=Math.round(celciusTemp);
}

let celciusTemp=null;

let form=document.querySelector("#search-form");
form.addEventListener("submit",connectSearch);

let fahrenheitLink=document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click",showFahrenheit);

let celciusLink=document.querySelector("#celcius");
celciusLink.addEventListener("click",showCelcius);

displayForecast();