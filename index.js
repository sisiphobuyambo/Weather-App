const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const temperature = document.getElementById("temp-text");
const city = document.getElementById("city-text");
const windSpeed = document.getElementById("wind-detail");
const humidity = document.getElementById("humidity-detail");
const tempImg = document.getElementById("temp-image");
const description = document.getElementById("description");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const temperature2 = document.getElementById("temp-text-2");
const feelsLikeTemp = document.getElementById("feels-like-temp");
const maxTemp = document.getElementById("max-temp");
const minTemp = document.getElementById("min-temp");
const apiKey = "30d4c77ab91d7a98a617d76fbef3692a" ;

// const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}`;



searchBtn.addEventListener("click",()=>{

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`)
        .then(response => {
            if(!response.ok){
                if(response.status === 404){
                    throw new Error("Data not found")
                } else if(response.status === 500){
                    throw new Error("Server error")
                }else{
                    throw new Error("Network response was not ok")
                }
            }
            return response.json()
        })
        .then(data => {
            console.log(data)

            const imgUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`

            const imgHtml = `<img style="font-size:2em;" src="${imgUrl}" alt="data.weather[0].description">`

            tempImg.innerHTML = imgHtml

            const temp = Math.round(data.main.temp)

            temperature.textContent = temp
            temperature2.textContent = temp
            feelsLikeTemp.textContent = Math.round(data.main.feels_like)
            city.textContent = data.name
            windSpeed.textContent = data.wind.speed
            humidity.textContent = data.main.humidity
            description.textContent = data.weather[0].description
            minTemp.textContent = data.main.temp_min;
            maxTemp.textContent = data.main.temp_max;

            const timezone = data.timezone;

            function convertTimestamptoTime(time){
                const dateObj = new Date((time + timezone)*1000);
                const hours = dateObj.getUTCHours();
                const minutes = dateObj.getUTCMinutes();
                
                return hours.toString().padStart(2, '0')  + ':' + minutes.toString().padStart(2, '0') 

                // return new Date((time + timezone)*1000).toUTCString();

            }

            sunrise.textContent = convertTimestamptoTime(data.sys.sunrise);
            sunset.textContent = convertTimestamptoTime(data.sys.sunset);

            console.log(data.sys.sunrise)

        })
        .catch(error => {
            console.error("Error:", error)
        })
})