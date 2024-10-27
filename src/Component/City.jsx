import React, { useState } from "react";
import "./City.css";

function City() {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  const cityDetails = async () => {
    if (!city.trim()) return;

    const key = "2939b0fc66e24a55912144702242610";
    const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`;
    setLoading(true);
    setWeatherData(null);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const data = await response.json();
      setWeatherData(data);
      setLoading(true);
    } catch (error) {
      alert("Failed to fetch weather data");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value.toLowerCase())}
      />
      <button type="submit" onClick={cityDetails}>
        Search
      </button>
      {loading && <p>Loading data…</p>}

      {weatherData && (
        <div className="weather-cards">
          <div className="weather-card">
            <h3>Temperature</h3>
            <p>{weatherData.current.temp_c}°C</p>
          </div>
          <div className="weather-card">
            <h3>Humidity</h3>
            <p>{weatherData.current.humidity}%</p>
          </div>
          <div className="weather-card">
            <h3>Condition</h3>
            <p>{weatherData.current.condition.text}</p>
          </div>
          <div className="weather-card">
            <h3>Wind Speed</h3>
            <p>{weatherData.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </>
  );
}

export default City;
