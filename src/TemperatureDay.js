import React from "react";

export default function TemperatureDay(props) {
  return (
    <div>
      <strong id="temperature">{Math.round(props.temperature)}</strong>
      <span className="units">°C</span>
    </div>
  );
}
