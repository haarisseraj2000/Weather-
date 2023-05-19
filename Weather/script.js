const apikey = "7fad1f832418f4c75cb269895b21000e";
const apiurl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weathericon = document.querySelector(".weather-icon");

async function checkWeather() {
  const city = searchbox.value;
  if (city) {
    try {
      const response = await fetch(apiurl + city + `&appid=${apikey}`);
      if (response.ok) {
        const data = await response.json();

        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = data.main.temp + "°C";
        document.querySelector(".humidity").innerHTML =
          data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " Kmph";
        if (data.weather[0].main == "Clouds") {
          weathericon.src = "images/clouds.png";
        } else if (data.weather[0].main == "Clear") {
          weathericon.src = "images/clear.png";
        } else if (data.weather[0].main == "Drizzle") {
          weathericon.src = "images/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
          weathericon.src = "images/mist.png";
        }
        document.querySelector(".weather").style.display = "block";
      } else {
        console.log("Error: " + response.status);
        alert("Enter a valid data " + response.status + " Error");
      }
    } catch (error) {
      console.log("An error occurred while fetching weather data: " + error);
      alert("An error occurred while fetching weather data: " + error);
    }
  } else {
    console.log("Please enter a city name.");
  }
}

searchbtn.addEventListener("click", checkWeather);