import React, { useState } from "react";

export default function TemperatureDayConversion(props) {
  let [unit, setUnit] = useState("celsius");

  function setToCelsius(event) {
    event.preventDefault();
    setUnit("celsius");
  }

  function setToFahrenheit(event) {
    event.preventDefault();
    setUnit("fahrenheit");
  }

  function convertToFahrenheit() {
    return (props.temperature * 9) / 5 + 32;
  }

  if (unit === "celsius") {
    return (
      <div>
        <strong id="temperature">{Math.round(props.temperature)}</strong>
        <span className="units">
          <a href="/" className="active" id="celsius-link">
            °C
          </a>
          |
          <a
            href="/"
            className="inactive"
            id="fahrenheit-link"
            onClick={setToFahrenheit}
          >
            °F
          </a>
        </span>
      </div>
    );
  } else {
    return (
      <div>
        <strong id="temperature">{Math.round(convertToFahrenheit())}</strong>
        <span className="units">
          <a
            href="/"
            className="inactive"
            id="celsius-link"
            onClick={setToCelsius}
          >
            °C
          </a>
          |
          <a href="/" className="active" id="fahrenheit-link">
            °F
          </a>
        </span>
      </div>
    );
  }
}
