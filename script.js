

const searchBox=document.querySelector(".search input");
const searchBtn=document.querySelector(".search button");
const weatherIcon=document.querySelector(".weather-icon");


const checkWeather= async(city)=>{
    try {
        // Try the local backend first
        const localEndpoint = `http://localhost:3000/weather?city=${encodeURIComponent(city)}`;
        let response;
        try {
            response = await fetch(localEndpoint, { mode: 'cors' });
        } catch (err) {
            // network error when trying local backend
            console.warn('Local backend unreachable, will try deployed backend:', err);
            response = null;
        }

        // If local responded but with server/key error, or didn't respond at all, fall back to deployed backend
        if (!response || !response.ok) {
            // If local responded with 404 -> invalid city, we can show invalid city immediately
            if (response && response.status === 404) {
                document.querySelector(".error").style.display = "block";
                document.querySelector(".weather").style.display = "none";
                return;
            }

            // If we got a JSON error body, use it for message (useful when API key missing)
            if (response) {
                const errBody = await response.json().catch(()=>({}));
                console.warn('Local backend error:', response.status, errBody);
                // continue to fallback to deployed backend
            }

            // deployed backend (public) as fallback
            const deployedEndpoint = `https://weather-app-qrsv.vercel.app/weather?city=${encodeURIComponent(city)}`;
            try {
                response = await fetch(deployedEndpoint);
            } catch (err) {
                console.error('Both local and deployed backends failed:', err);
                document.querySelector(".error").textContent = 'Unable to fetch weather data (network error)';
                document.querySelector(".error").style.display = "block";
                document.querySelector(".weather").style.display = "none";
                return;
            }

            if (!response.ok) {
                if (response.status === 404) {
                    document.querySelector(".error").style.display = "block";
                    document.querySelector(".weather").style.display = "none";
                    return;
                }
                const errBody = await response.json().catch(()=>({}));
                console.error('Deployed backend error', response.status, errBody);
                document.querySelector(".error").textContent = (errBody && errBody.error) ? errBody.error : 'Error fetching weather data';
                document.querySelector(".error").style.display = "block";
                document.querySelector(".weather").style.display = "none";
                return;
            }
        }

        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + " °C"; // Math.round gives only the integer value
        document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

if(data.weather[0].main=="Clouds"){
    weatherIcon.src="images/clouds.png"; 
}

else if(data.weather[0].main=="Clear"){
    weatherIcon.src="images/clear.png";
}
else if(data.weather[0].main=="Rain"){
    weatherIcon.src="images/rain.png";
}
else if(data.weather[0].main=="Snow"){
    weatherIcon.src="images/snow.png";
}
else if(data.weather[0].main=="Drizzle"){
    weatherIcon.src="images/drizzle.png";
}
else if(data.weather[0].main=="Mist"){
    weatherIcon.src="images/mist.png";
}

document.querySelector(".weather").style.display="block";
document.querySelector(".error").style.display="none";
    } catch (err) {
        console.error('Unexpected error in checkWeather:', err);
        document.querySelector(".error").textContent = 'Error fetching weather data';
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}

searchBtn.addEventListener("click",()=>{
    checkWeather(searchBox.value);
});

