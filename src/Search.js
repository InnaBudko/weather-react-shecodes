import React, { useState } from "react";
import axios from "axios";
import WeatherCurrentDate from "./WeatherCurrentDate";
import TemperatureDay from "./TemperatureDay";
import WeatherForecast from "./WeatherForecast";

export default function Search(props) {
  let [city, setCity] = useState("");
  let [weatherData, setWeatherData] = useState({});

  let [found, setFound] = useState(false);
  let [error, setError] = useState(null);

  function getWeatherDataDay(response) {
    setWeatherData({
      temperature: response.data.temperature.current,
      description: response.data.condition.description,
      humidity: response.data.temperature.humidity,
      wind: response.data.wind.speed,
      icon: response.data.condition.icon_url,
      cityFound: response.data.city,
      date: response.data.time,
      coordinates: response.data.coordinates,
    });

    setFound(true);
    console.log(response.data);
  }

  function handleSubmitError() {
    setError(`Sorry, we did not find ${city}`);
  }

  function makeApiCall(city) {
    let apiKey = "95c40b01td464da65f4f835cof7b5c75";
    let endpoint = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios
      .get(endpoint)
      .then(getWeatherDataDay)
      .catch(function (error) {
        console.log(error);
        handleSubmitError();
        setFound(false);
      });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (city.trim().length !== 0) {
      makeApiCall(city);
      setCity(``);
      setError(``);
    } else {
      setFound(false);
    }
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <div className="Search row justify-content-end mb-4 search-form">
      <div className="col-8">
        <form
          onSubmit={handleSubmit}
          className="form-inline form-control-sm"
          id="search-form"
        >
          <div className="input-group">
            <input
              type="search"
              className="form-control rounded"
              placeholder="Type a city..."
              aria-label="Search"
              aria-describedby="search-addon"
              id="city-input"
              autoComplete="off"
              autoFocus="off"
              value={city}
              onChange={updateCity}
            />
            <button
              type="submit"
              className="btn btn-primary"
              id="search-button"
            >
              search
            </button>
          </div>
        </form>
        <div className="text-danger" id="error-placeholder"></div>
      </div>
    </div>
  );

  if (found) {
    return (
      <div className="search-form">
        {form}
        <br />

        <div className="CurrentWeather">
          <div className="row mb-3 mt-2 current-weather-data">
            <div className="col-3 p-0 mr-5">
              <div className="d-flex align-items-start weather-temperature">
                <img
                  src={weatherData.icon}
                  alt={weatherData.description}
                  id="weather-icon"
                />
                <div>
                  <TemperatureDay temperature={weatherData.temperature} />
                </div>
              </div>
            </div>
            <div className="col-3 pl-2 pb-0 ml-5">
              <div className="weather-details">
                <div>
                  Humidity: <span id="humidity">{weatherData.humidity}</span>%
                </div>
                <div>
                  Wind: <span id="wind">{weatherData.wind}</span>
                  <span id="wind-units"> km/h</span>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="overview">
                <div className="city" id="city">
                  {weatherData.cityFound}
                </div>
                <div>
                  <span className="current-date">
                    <WeatherCurrentDate date={weatherData.date} />
                  </span>
                </div>
                <div className="description" id="description">
                  {weatherData.description}
                </div>
              </div>
            </div>
          </div>
          <WeatherForecast coordinates={weatherData.coordinates} />
        </div>
      </div>
    );
  } else if (!found && error != null) {
    return (
      <div className="search-form">
        {form}
        <div className="search-result text-center">Please enter a city</div>
        <div className="search-result text-center text-danger">{error}</div>
      </div>
    );
  } else {
    makeApiCall(props.defaultCity);
    return <div className="search-form">loading...</div>;
  }
}
