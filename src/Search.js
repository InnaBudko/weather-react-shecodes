import React, { useState } from "react";
import axios from "axios";

export default function Search() {
  let [city, setCity] = useState(``);
  let [temperature, setTemperature] = useState(null);
  let [description, setDescription] = useState(null);
  let [humidity, setHumidity] = useState(null);
  let [wind, setWind] = useState(null);
  let [icon, setIcon] = useState(null);
  let [cityFound, setCityFound] = useState(null);
  let [state, setState] = useState(false);

  function setForecastCelsius(response) {
    setState(true);
    setTemperature(response.data.temperature.current);
    setDescription(response.data.condition.description);
    setHumidity(response.data.temperature.humidity);
    setWind(response.data.wind.speed);
    setIcon(response.data.condition.icon_url);
    setCityFound(response.data.city);
    console.log(response);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (city.trim().length !== 0) {
      let apiKey = "95c40b01td464da65f4f835cof7b5c75";
      let endpoint = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
      axios
        .get(endpoint)
        .then(setForecastCelsius)
        .catch(function (error) {
          console.log(error);
          alert(`Sorry, we did not find ${city}`);
          setState(false);
        });

      setCity(``);
    } else {
      setState(false);
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
              type="button"
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

  if (state) {
    return (
      <div className="search-form">
        {form}
        <br />

        <div className="CurrentWeather">
          <div className="row mb-3 mt-2 current-weather-data">
            <div className="col-3 p-0 mr-5">
              <div className="d-flex align-items-start weather-temperature">
                <img src={icon} alt={description} id="weather-icon" />
                <div>
                  <strong id="temperature">{Math.round(temperature)}</strong>
                  <span className="units">
                    <a href="/" className="active" id="celsius-link">
                      °C
                    </a>
                    |
                    <a href="/" className="inactive" id="fahrenheit-link">
                      °F
                    </a>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-3 pl-2 pb-0 ml-5">
              <div className="weather-details">
                <div>
                  Humidity: <span id="humidity">{humidity}</span>%
                </div>
                <div>
                  Wind: <span id="wind">{wind}</span>
                  <span id="wind-units"> km/h</span>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="overview">
                <div className="city" id="city">
                  {cityFound}
                </div>
                {/* <div>
                  <span className="last-updated">Last updated: </span>
                  {currentWeather.day}
                  <span id="date-time"> {currentWeather.dateAndTime}</span>
                </div> */}
                <div className="description" id="description">
                  {description}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="search-form">
        {form}
        <br />
        <div className="search-result">Please enter a city</div>
      </div>
    );
  }
}
