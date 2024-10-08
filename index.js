const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const temperature = document.getElementById("temp-text");
const city = document.getElementById("city-text");
const windSpeed = document.getElementById("wind-detail");
const humidity = document.getElementById("humidity-detail");
const tempImg = document.getElementById("temp-image");
const description = document.getElementById("description");
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

            const imgHtml = `<img style="width:100%" src="${imgUrl}" alt="data.weather[0].description">`

            tempImg.innerHTML = imgHtml

            temperature.textContent = Math.round(data.main.temp)
            city.textContent = data.name
            windSpeed.textContent = data.wind.speed
            humidity.textContent = data.main.humidity
            description.textContent = data.weather[0].description
        })
        .catch(error => {
            console.error("Error:", error)
        })
})