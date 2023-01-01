const errorMassage = document.querySelector('.errorMassage');
const weatherForm = document.querySelector('form')
const searchForm = document.querySelector('input')
const country = document.querySelector('.country')
const time1 = document.querySelector('.time')
const temp = document.querySelector('.temp')
const tempimg = document.querySelector('#tempimg')
const massage1 = document.querySelector('#massage-1')
const massage2 = document.querySelector('#massage-2')
const massage3 = document.querySelector('#massage-3')
const massage4 = document.querySelector('#massage-4')
const massage5 = document.querySelector('#massage-5')
const massage6 = document.querySelector('#massage-6')
const massage7 = document.querySelector('#massage-7')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = searchForm.value

    fetch(`http://api.weatherapi.com/v1/current.json?key=0bab7dd1bacc418689b143833220304&q=${location}`).then((response) => {
        response.json().then((responseData) => {
            if(responseData.error) {
                errorMassage.textContent = "Unable to location ! Please try another location"
            }else{
            // console.log(responseData.location.name)
            // locationName.textContent = responseData.location.name
            // console.log(responseData.current)
            // Humidity.textContent = responseData.current.humidity
            massage1.textContent = "Humidity : "+responseData.current.humidity;
            massage2.textContent = "Wind kph : "+responseData.current.wind_kph;
            massage3.textContent = "Last Update : "+responseData.current.last_updated;
            massage4.textContent = "Pressure : "+responseData.current.pressure_in;
            massage5.textContent = "Feels like : "+responseData.current.feelslike_c;
            massage6.textContent = "Region : "+responseData.location.region;    
            massage7.textContent = "Cloud : "+responseData.current.cloud;
            tempimg.setAttribute('src',responseData.current.condition.icon)
            temp.textContent = responseData.current.temp_c + "°C";
            time1.textContent = responseData.location.localtime + " ";
            country.textContent = responseData.location.name +", "+responseData.location.country;
            }
        })
    
    })

        console.log(location)
    console.log('testing')
})
