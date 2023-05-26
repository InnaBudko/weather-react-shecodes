import React from "react";

export default function WeatherCurrentDate(props) {
  // calculate the date and time from unix timestamp

  let date = new Date(props.date * 1000);
  let day = date.toLocaleDateString("en-US", { weekday: "long" });
  let hours = String(date.getHours()).padStart(2, "0");
  let minutes = String(date.getMinutes()).padStart(2, "0");

  return (
    <div>
      {day} {hours}:{minutes}
    </div>
  );
}
