import React, { useState } from "react";
import axios from "axios";
import WeatherForecastDay from "./WeatherForecastDay";

export default function WeatherForecast(props) {
  let [loaded, setLoaded] = useState(false);
  let [forecast, setForecast] = useState(null);

  // let minTemperature = 5;
  // let maxTemperature = 10;
  // let icon =
  //   "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-day.png";
  // let description = "desc";

  function displayForecast(response) {
    setForecast(response.data.daily);
    setLoaded(true);
  }

  if (loaded) {
    console.log(forecast[0]);
    return (
      <div className="WeatherForecast">
        <div className="weather-forecast">
          <div className="row justify-content-start mt-3" id="forecast">
            <div className="col">
              {/* <div className="weather-forecast-date">day</div>
              <img
                src={forecast[0].condition.icon_url}
                alt={forecast[0].condition.description}
                width="42"
              />
              <div className="weather-forecast-temperature">
                <div className="forecast-temperature-max">
                  {Math.round(forecast[0].temperature.maximum)}°
                </div>
                <div className="forecast-temperature-min">
                  {Math.round(forecast[0].temperature.minimum)}°
                </div>
              </div> */}
              <WeatherForecastDay responseData={forecast[0]} />
            </div>
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
