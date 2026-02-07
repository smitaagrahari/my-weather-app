import { useState } from "react";
import sunnyVideo from "./assets/videos/sunny.mp4";
import rainVideo from "./assets/videos/rainy.mp4";
import cloudyVideo from "./assets/videos/cloudy.mp4";
import fogVideo from "./assets/videos/fog.mp4";
import thunderVideo from "./assets/videos/thunder.mp4";
import snowVideo from "./assets/videos/snow.mp4";
import iceVideo from "./assets/videos/ice.mp4";

function App() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);

  function handleChange() {
    let key = "88ab8ca5a92a4c3dbcc100414252304";

    if (city.trim() !== "") {
      fetch(
        `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`
      )
        .then((res) => res.json())
        .then((d) => setData(d))
        .catch((err) => console.error(err));
    }
  }
  const getWeatherType = (conditionText) => {
    const text = conditionText.toLowerCase();

    // ☀️ Clear / Sunny
    if (text.includes("sunny") || text.includes("clear")) {
      return "sunny";
    }

    // 🌤️ Cloudy
    if (
      text.includes("cloudy") ||
      text.includes("overcast") ||
      text.includes("partly")
    ) {
      return "cloudy";
    }

    // 🌫️ Fog / Mist
    if (
      text.includes("mist") ||
      text.includes("fog")
    ) {
      return "fog";
    }

    // 🌦️ Rain
    if (
      text.includes("rain") ||
      text.includes("drizzle") ||
      text.includes("shower")
    ) {
      return "rain";
    }

    // ⛈️ Thunderstorm
    if (
      text.includes("thunder")
    ) {
      return "thunder";
    }

    // ❄️ Snow
    if (
      text.includes("snow") ||
      text.includes("blowing snow")
    ) {
      return "snow";
    }

    // 🌨️ Ice / Sleet
    if (
      text.includes("sleet") ||
      text.includes("ice") ||
      text.includes("freezing")
    ) {
      return "ice";
    }

    // Default fallback
    return "default";
  };

  let weatherType = data
    ? getWeatherType(data.current.condition.text)
    : null;

  const videoMap = {
    sunny: sunnyVideo,
    cloudy: cloudyVideo,
    fog: fogVideo,
    rain: rainVideo,
    thunder: thunderVideo,
    snow: snowVideo,
    ice: iceVideo,
  };
  const backgroundVideo = weatherType
    ? videoMap[weatherType]
    : null;


  return (
    <div className="app">
      {backgroundVideo && (
        <video
          className="bg-video"
          src={backgroundVideo}
          autoPlay
          loop
          muted
          playsInline
        />
      )}

      <div className={`weather-card ${weatherType}`}>

        <h1>Weather App 🌤️</h1>

        <div className="input-group">
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={handleChange}>Show weather</button>
        </div>

        {data && (
          <div className="weather-info">
            <h2>{data.location.name}, {data.location.country}</h2>
            <p className="temp">{data.current.temp_c}°C</p>
            <p>{data.current.condition.text}</p>
          </div>
        )}
      </div>
    </div>
  );


}

export default App;
