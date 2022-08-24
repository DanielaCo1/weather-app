//Get input value
// ajouter un event sur submit
let button = document.querySelector(".button-icone");
button.addEventListener("click", (e) => {
    let city = document.querySelector("#citySearch").value;

    let url = generateUrl(city, "weather");
    getResponse(url).then(datas=>{
        displayWeather(datas);
    })

    
    url = generateUrl(city, "forecast");
    getResponse(url).then(datas=>{
        displayForecast(datas);
    } )
    
})

let section = document.querySelector(".degrees");
let icon
let response
let body
let weather
let getWeather




/**
* Create the Weather list Forecast ( 5 days);
* @param {object} datas an objec
*/
function displayForecast(datas){
    let weatherList = datas.list;
    let div=document.querySelector(".card-one__forecast");
    
    let day = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
    ];

    div = document.createElement("div");
    div.classList.add("card-one__forecast");
    div.innerHTML = weatherList.map((weatherElm)=>{
        let hours = new Date(weatherElm.dt_txt).getHours();
        if ( hours === 12){

            let date = new Date(weatherElm.dt_txt).getDay();
            let dayName = day[date];
            let imgName = weatherElm.weather[0].icon; 
            let imgPath = "http://openweathermap.org/img/wn/"+imgName+"@2x.png";
            let degrees =weatherElm.main.temp;
            degrees = parseInt(degrees);
  
            return `
                <section class="current-day" id="current-temp">
                    <div class="day">${dayName}</div>                
                    <img src="${imgPath}" alt ="" class="w-icon">
                    <div class="degree">${degrees}° C</div>
                </section>
            `
            
        } 
    let main = document.querySelector(".container");
    main.appendChild(div);
    }).join('');
};

displayForecast()



function displayWeather(datas){ 
    ///console.log(datas);


    let degrees
    let cityName = datas.name;
    //console.log(datas);
    //console.log(datas.name);
    let speed = datas.wind.speed;
    //console.log(datas.wind.speed);
    let sky = datas.weather[0].main;
    let humidity = datas.main.humidity
    //console.log(datas.main.humidity);

    //Display city Name
    section=document.querySelector(".NameVille");
    section.innerHTML = "Weather in" + " " + cityName;

    //Display temperature
    section = document.querySelector(".degrees");
    let degree = datas.main.feels_like;
    degree = parseInt(degree); 
    section.innerHTML = degree+"°" + " " + "C";
    
    //Display weather icon
    let imgName = datas.weather[0].icon;
    let imgPath = "http://openweathermap.org/img/wn/"+imgName+"@2x.png";
    let img = document.createElement("img");
    img.setAttribute("src",imgPath);
    section = document.querySelector(".icon");
    section.appendChild(img);


    //Display Sky
    section=document.querySelector(".sky");
    section.innerHTML = "sky:" + " " + sky ;
    console.log(sky);

    //Display Wind
    section=document.querySelector(".wind");
    section.innerHTML = "Wind speed:" + " " + speed + " " +  "km/h" ;
    console.log(speed);

    //Display Humidity
    section=document.querySelector(".humidity");
    section.innerHTML = "humidity: " + " " + humidity + "%";
    console.log(humidity);

    document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + datas.name + "')"
    console.log(datas.name);
}

function generateUrl(city, type){//genera l'url che va a cercare il file json e recupera il valore 
    let url = "https://api.openweathermap.org/data/2.5/";
    if(type==="weather"){
        url += "weather?q=" 

    }else{
        url += "forecast?q=" 
    }
    url += city 
    url += "&units=metric&lang=fr&appid=decdf084054a5691c57a842fab46f209";
    console.log(url)
    return url;
}

async function getResponse(url) {
    const response = await fetch(url);
    return response.json();
}
