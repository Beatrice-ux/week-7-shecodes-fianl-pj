function formDate(timestamp){
    let date=new Date(timestamp);
    let hours=date.getHours();
    let minutes=date.getMinutes();
    let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let day=days[date.getDay()];

    return(`${day} ${hours}:${minutes}`);
}




function showTemperature(response){
    console.log(response.data);
    let placeElement=document.querySelector("#place");
    let temperatureElement=document.querySelector("#temperature");
    let descriptionElement=document.querySelector("#description");
    let humidityElement=document.querySelector("#humidity");
    let windElement=document.querySelector("#wind");
    let dateElement=document.querySelector("#date");
    placeElement.innerHTML=response.data.name;
    temperatureElement.innerHTML=Math.round(response.data.main.temp);
    descriptionElement.innerHTML=response.data.weather[0].description;
    humidityElement.innerHTML=response.data.main.humidity;
    windElement.innerHTML=Math.round(response.data.wind.speed);
    dateElement.innerHTML= formDate(response.data.dt*1000)

}


let apiKey="a3b981fcdb00e192a7a49927e31c8d54";
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showTemperature);
