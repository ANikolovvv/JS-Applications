function attachEvents() {
    const location=document.getElementById('location');
    const btn=document.getElementById('submit');
    const forecast=document.getElementById('forecast');

    const divCurrent = document.getElementById("current");
    const divUp = document.querySelector(`#upcoming `);

    

    btn.addEventListener('click',weather);
    const weatherSymbols = {
        'Sunny': "☀",
        "Partly sunny": "⛅", // ⛅
        "Overcast": "☁", // ☁
        "Rain": "☂", // ☂
        "Degrees": "°", // °
      };

    async function weather(e){
        const url='http://localhost:3030/jsonstore/forecaster/locations';
        const res=await fetch(url);
        forecast.style.display='block';
        try {
            if(res.status!==200){
                throw new Error();
            }
            const data=await res.json();
            const towns=Object.values(data);
            const find=towns.find(x=>x.name===location.value);
              if(find !==undefined){
                  
                today(find);
                upcoming(find);
              }else{
                throw new Error('');
              }

            location.value='';
            
        } catch (err) {
            forecast.textContent=err;
            
        }
        
    }
    async function today(town) {
        console.log(town);
        
        let currentUrl = `http://localhost:3030/jsonstore/forecaster/today/${town.code}`;
        const res=await fetch(currentUrl);
        try {
            if(res.status!==200){
               throw new Error();
            }
            const data=await res.json();
            const clear=Array.from(divCurrent.querySelectorAll('div'));
            const fyrst=clear.shift();
            clear.map(x=>x.remove())
            divCurrent.replaceChildren("");
            forecast.style.display = "block";
            let spanForecase = document.createElement("span");
            spanForecase.setAttribute("class", "condition symbol");
            let forWeather = data.forecast.condition;
  
            spanForecase.textContent = weatherSymbols[forWeather];
            // console.log(spanForecase.textContent);
  
            let span = document.createElement("span");
            span.setAttribute("class", "condition");
  
            let spanCity = document.createElement("span");
            spanCity.setAttribute("class", "forecast-data");
            spanCity.textContent = data.name;
  
            let spanHigh = document.createElement("span");
            spanHigh.setAttribute("class", "forecast-data");
            spanHigh.textContent = `${data.forecast.high}/${data.forecast.low}`;
  
            let time = document.createElement("span");
            time.setAttribute("class", "forecast-data");
            time.textContent = `${forWeather}`;
  
            span.appendChild(spanCity);
            span.appendChild(spanHigh);
            span.appendChild(time);
  
            divCurrent.appendChild(spanForecase);
            divCurrent.appendChild(span);
        } catch (err) {
            const div=document.createElement('div');
            div.textContent=err;
            forecast.replaceChildren(div)
            //forecast.textContent=error;
        }
    }
    async function upcoming(town) {
        //console.log(town)
        const clear=Array.from(divUp.querySelectorAll('div'));
        const fyrst=clear.shift();
        clear.map(x=>x.remove())
        const upUrl = `http://localhost:3030/jsonstore/forecaster/upcoming/${town.code}`;

        const res=await fetch(upUrl);
        try {
            if(res.status!==200){
               throw new Error();
            }
            const data=await res.json();

            let div = document.createElement("div");
            div.setAttribute("class", "forecast-data");
           
            data.forecast.forEach((d) => {
                let upSpan = document.createElement("span");
                upSpan.setAttribute("class", "upcoming");
    
                let condition = document.createElement("span");
                condition.setAttribute("class", "forecast-data");
                condition.textContent = `${weatherSymbols[d.condition]}`;
    
                let gradus = document.createElement("span");
                gradus.setAttribute("class", "forecast-data");
                gradus.textContent = `${d.high}/${d.low}`;
    
                let time = document.createElement("span");
                time.setAttribute("class", "forecast-data");
                let warm = Object.keys(weatherSymbols).find(
                  (w) => weatherSymbols[w] === weatherSymbols[d.condition]
                );
    
                time.textContent = `${warm}`;
    
                upSpan.appendChild(condition);
                upSpan.appendChild(gradus);
                upSpan.appendChild(time);
                div.appendChild(upSpan);
              });
    
              divUp.appendChild(div);
        } catch (err) {
            //forecast.textContent=err;
            const div=document.createElement('div');
            div.textContent=err;
            forecast.replaceChildren(div)
        }
        
    }
 
}

attachEvents();