// ./js/weather.js

// ❗ 포인트: 실제 API 키는 아래 상수에 넣되,
// 깃허브에 올릴 땐 비워두고, README에 "본인 키 넣으세요"라고 안내하는 걸 추천합니다.
// const WEATHER_API_KEY = ""; // ← OpenWeatherMap API 키를 여기에 입력
const WEATHER_API_KEY = "4b53920dc4306783c08d12180c3f25c7";

const weatherContainer = document.querySelector("#weather");
const weatherMainElement = weatherContainer.querySelector("span:first-child");
const weatherCityElement = weatherContainer.querySelector("span:last-child");

/**
 * 위도/경도로 날씨 정보 요청
 */
async function fetchWeather(lat, lon) {
  if (!WEATHER_API_KEY) {
    // API 키가 없으면 안내 문구만 표시하고 종료
    weatherMainElement.textContent = "Weather API key is missing.";
    weatherCityElement.textContent = "";
    console.warn("Set WEATHER_API_KEY in weather.js to see live weather data.");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric&lang=kr`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const temperature = Math.round(data.main.temp);
    const description = data.weather?.[0]?.main ?? "Weather";
    const city = data.name;

    weatherMainElement.textContent = `${description} · ${temperature}°C`;
    weatherCityElement.textContent = city;
  } catch (error) {
    console.error("Failed to fetch weather:", error);
    weatherMainElement.textContent = "Weather unavailable.";
    weatherCityElement.textContent = "";
  }
}

/**
 * 위치 정보를 성공적으로 가져온 경우
 */
function handleGeoSuccess(position) {
  const { latitude, longitude } = position.coords;
  fetchWeather(latitude, longitude);
}

/**
 * 위치 정보 가져오기 실패/거부
 */
function handleGeoError(error) {
  console.warn("Geolocation error:", error);
  weatherMainElement.textContent = "Location denied.";
  weatherCityElement.textContent = "";
}

/**
 * 초기 실행
 */
function initWeather() {
  if (!("geolocation" in navigator)) {
    weatherMainElement.textContent = "No geolocation support.";
    weatherCityElement.textContent = "";
    return;
  }

  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

initWeather();
