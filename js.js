const infoSection = document.querySelector(".infoSection")
const btnSearch = document.querySelector(".btnSrc")
const inputLoc = document.querySelector(".inputLoc")

btnSearch.addEventListener("click", () => { // axtarış butonuna klik olduqda
    if (inputLoc.value != "") { // əgər inputun içərisinə məlumat daxil edilibsə

        const locationName = inputLoc.value  // inputa daxil ediləni götürüb
        inputLoc.value = "" // inputun içərisini sıfırlayırıq

        fetch(` https://api.openweathermap.org/data/2.5/weather?q=${locationName}&appid=54b1407dcc4d3ca0d88eefdeca4dd8a4&units=metric`)  // sorğu göndəririk 

            .then(result => {
                return result.json() // nəticəni emal edirik
            })
            .then(importData => { // uğurlu nətirəcni bloka ötürürük və nəticəyə əsasən müvafiq sectiona məlumatları göndəririk mən ul içində li ilə göndərirəm

                infoSection.innerHTML = ` <ul>
                <li> <strong>City:</strong> ${importData.name} </li>
                
                <li> <strong>Country:</strong>  ${importData.sys.country} </li>
                <li> <strong>Temp:</strong>  ${importData.main.feels_like
                    } °C</li>
                <li> <strong>Max temp:</strong> ${importData.main.temp_max} °C</li>
                <li> <strong>Min temp:</strong> ${importData.main.temp_min} °C</li>
                <li> <strong>Humidity:</strong>  ${importData.main.humidity} % </li>
                <li> <strong>Wind speed:</strong> ${importData.wind.speed} meter/sec</li>
                
                <li class="parentImg"> <strong>Weather: </strong>    ${importData.weather[0].description}  <img src="https://openweathermap.org/img/wn/${importData.weather[0].icon}@2x.png" alt=""> </li>


                </ul>`
            })
            .catch(error => { // məlumat uğursuz olanda erroru çap edirik

                infoSection.textContent = `No location was found matching the name you entered, example "London"`
            })
    }else{  // input boş olanda daxil etməsini tələb edirik

                infoSection.textContent = "You did not enter a location name"
    }
})