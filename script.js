const ApiKey = "46320d9ae0fdabc35d47184f46c961d3" ;
const ApiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=" ;

//access search input value
const searchInput = document.querySelector("[data-search-city]") ;
const searchBtn = document.querySelector("[data-search-btn]") ;

const allWeatherInfo = document.querySelector(".user-info-container") ;
const errorShow = document.querySelector(".error-container") ;
const loadingGIF = document.querySelector(".loading-container") ;

async function checkWeather (cityName)
{
    try
    {
        const response = await fetch(ApiURL + cityName + `&appID=${ApiKey}`) ;
        // const response = await fetch(ApiURL + "&appID=" + ApiKey) ;
        if (response.status == 404)
        {
            errorShow.style.display = "block" ;
            allWeatherInfo.style.display = "none" ;
            return ;
        }
        if (!response.ok)
            throw new Error (`Network response was not ok: ${response.statusText}`) ;
        
        let data = await response.json() ;
        console.log(data) ;

        const city = document.querySelector("#cityName") ;
        const flag = document.querySelector("#cityFlag") ; 
        const descWeather = document.querySelector("#weatherDescription") ;
        const descIcon = document.querySelector("#desIcon") ;
        const temp = document.querySelector("#temp") ;
        const wind = document.querySelector("#wind") ;
        const humidity = document.querySelector("#humidity") ;
        const cloud = document.querySelector("#cloud") ;


        // update all data for showing
        city.innerHTML = data.name;
        descWeather.innerHTML = data.weather[0].description ;
        temp.innerHTML = Math.floor( data.main.temp) + " °C" ;
        wind.innerHTML = data.wind.speed + " m/s" ;
        humidity.innerHTML = data.main.humidity + "%" ;
        cloud.innerHTML = data.clouds.all + "%";


        //add weather description icon & flag
        let iconCode = data.weather[0].icon ; 
        let iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        descIcon.src = iconURL ;

        let countryCode = data.sys.country ;
        let flagURL = `https://flagcdn.com/h40/${countryCode.toLowerCase()}.png` ;
        flag.src = flagURL ;

        //when enter city name then all information will be shown
        allWeatherInfo.style.display = "block" ;
        errorShow.style.display = "none" ;
    
    }
    catch (error)
    {
        console.error("There was a problem with the fetch operation:",error) ;
    }
    
}




//when search button triggerd
searchBtn.addEventListener("click", ()=>{
    checkWeather(searchInput.value) ;
}) ;

// additionaly , when enter click on input filed
searchInput.addEventListener("keydown" , (event)=>{
    if (event.key === "Enter")
        checkWeather(searchInput.value) ;
}) ;
