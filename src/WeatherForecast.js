import React, { useState } from "react";
import axios from "axios";
import WeatherForecastDay from "./WeatherForecastDay";

export default function WeatherForecast(props) {
  let [loaded, setLoaded] = useState(false);
  let [forecast, setForecast] = useState(null);

  function displayForecast(response) {
    setForecast(response.data.daily);
    setLoaded(true);
  }

  if (loaded) {
    console.log(forecast);
    return (
      <div className="WeatherForecast">
        <div className="weather-forecast">
          <div className="row justify-content-start mt-3" id="forecast">
            {forecast.map(function (dailyForecast, index) {
              if (index < 5) {
                return (
                  <div className="col" key={index}>
                    <WeatherForecastDay responseData={dailyForecast} />
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    );
  } else {
    let apiKey = "95c40b01td464da65f4f835cof7b5c75";
    let longitude = props.coordinates.longitude;
    let latitude = props.coordinates.latitude;
    let endpoint = `https://api.shecodes.io/weather/v1/forecast?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=metric`;
    axios
      .get(endpoint)
      .then(displayForecast)
      .catch(function (error) {
        console.log(error);
      });
    return null;
  }
}
