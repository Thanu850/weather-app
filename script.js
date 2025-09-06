 // Replace with your OpenWeather key
// ********** CONFIG **********
const API_KEY = "8d689c08feb3117bf5e12b5f8772e542"; // <-- replace with your OpenWeather API key
// ****************************

const $ = (id) => document.getElementById(id);
const cityInput = $("cityInput");
const searchBtn = $("searchBtn");
const status = $("status");

// Main function to fetch weather
async function getWeatherFor(city) {
  status.textContent = "Loading…";
  status.classList.remove("muted");
  
  const trimmedCity = city.trim();
  if (!trimmedCity) {
    status.textContent = "Please enter a city name.";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(trimmedCity)}&appid=${API_KEY}&units=metric`;
  console.log("Fetching URL:", url); // Debug

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Check for API errors
    if (response.status !== 200) {
      status.textContent = `Error: ${data.message}`;
      $("result").classList.add("hidden");
      return;
    }

    showResult(data);
    status.textContent = "";
  } catch (err) {
    console.error(err);
    status.textContent = "Network error or API issue!";
    $("result").classList.add("hidden");
  }
}

// Function to display results
function showResult(data) {
  $("cityName").textContent = `${data.name}, ${data.sys?.country || ""}`;
  $("temp").textContent = Math.round(data.main.temp);
  $("desc").textContent = data.weather?.[0]?.description?.toUpperCase() || "";
  $("humidity").textContent = data.main.humidity;
  $("wind").textContent = data.wind.speed;
  $("result").classList.remove("hidden");
}

// Event listeners
searchBtn.addEventListener("click", () => getWeatherFor(cityInput.value));
cityInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") searchBtn.click();
});

