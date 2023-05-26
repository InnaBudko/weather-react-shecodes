import React from "react";
import WeatherForecastDate from "./WeatherForecastDate";

export default function WeatherForecastDay(props) {
  function maxTemperature() {
    return Math.round(props.responseData.temperature.maximum);
  }

  function minTemperature() {
    return Math.round(props.responseData.temperature.minimum);
  }

  return (
    <div>
      <div className="weather-forecast-date">
        <WeatherForecastDate timestamp={props.responseData.time} />
      </div>
      <img
        src={props.responseData.condition.icon_url}
        alt={props.responseData.condition.description}
        width="42"
      />
      <div className="weather-forecast-temperature">
        <div className="forecast-temperature-max">{maxTemperature()}°</div>
        <div className="forecast-temperature-min">{minTemperature()}°</div>
      </div>
    </div>
  );
}
