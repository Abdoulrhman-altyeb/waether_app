const input =document.getElementById('query');

input.addEventListener('keydown', function(e) {
    if(e.keyCode == 13) {
        const value = e.target.value;
        fetchData(value);
    }
})

function setData(data) { 
    const current = data.current;
    const forecast = data.forecast;
    const location = data.location;

    // city conditions 
    const iconImg = document.querySelector('.weather-status .icon');
    const condition = document.querySelector('.weather-status .condition p');
    const city = document.querySelector('.city');
    const temp = document.querySelector('.temper');

    temp.textContent = current.temp_c; 
    city.innerHTML = `<h3> ${location.name}</h3>`;
    iconImg.innerHTML = `<img src=${current.condition.icon} alt='weather condition icon'>`;
    condition.textContent = current.condition.text;


    // destiled conditions
    const humidity = document.getElementById('humidity');
    const airPressure = document.getElementById('air_pre');
    const rain = document.getElementById('rain');
    const wind = document.getElementById('wind');


    humidity.textContent = current.humidity;
    airPressure.textContent = current.pressure_mb;
    wind.textContent = current.wind_kph;
    rain.textContent = current.cloud;



    // the daily conditions 
    const day = document.querySelector('.day');
    const date = new Date().toString().split(' ').slice(1,2);
    const container = document.getElementById('cards');

    day.textContent = date;

    const list = forecast.forecastday[0].hour.splice(0,7).map((oneHour) => {
        return(`<div class="card ">
        <div class="time"><span>${oneHour.time}</span></div>
        <div class="degree"><span id='degree-calc'>${Math.round(oneHour.temp_c)}</span>°C</div>
        <div class="up-to">feels like <span>${oneHour.feelslike_c}</span>°C</div>
        </div>`);
    }).join(' ')
    container.innerHTML=  list;
    return container;
}

function fetchData(query) {
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=3a7dc66b91bc44a695e151042212905&q=${query}`).then(response => response.json()).then(data => setData(data));
}


window.addEventListener('load',function(){
    fetchData('sudan');
})
// cards swap 
// const cards = document.querySelector('.cards');
// const card = document.querySelectorAll('.card');
// const leftBtn = document.getElementById("left");
// const rightBtn = document.getElementById("right");
// console.log(container);

// let cardView = Math.floor(cards.clientWidth / (card[0].clientWidth + (cards.length - 2 )));

// let count = 0;

// window.addEventListener('load',function(){
//     count = 0;
//     fetchData('sudan');
//     card[0].scrollIntoView();
// })

// function rightClick(e){
//     count+=5;
//     getCount(count);
//     scrollInto(card[count],card.length);
// }

// function leftClick(e){

//     count-=5;
//     getCount(count);
//     scrollInto(card[count], card.length);
// }

// function getCount(count){
//     if(count <= 0) {
//         leftBtn.setAttribute('disabled','disabled');
//         rightBtn.removeAttribute('disabled','disabled')
//     } else if(count >= 24){
//         rightBtn.setAttribute('disabled','disabled');
//         leftBtn.removeAttribute('disabled','disabled');
//     } else {
//         rightBtn.removeAttribute('disabled','disabled')
//         leftBtn.removeAttribute('disabled','disabled')
//     }

//     console.log(count)
// }

// function scrollInto(el,index) {
//     if(count >= index) {
//         return
//     }
//     if(count < 0){
//         return
//     }
//     return el.scrollIntoView();
// }

// rightBtn.addEventListener('click',rightClick);

// leftBtn.addEventListener('click',leftClick)
