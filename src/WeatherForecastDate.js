import React from "react";

export default function WeatherForecastDate(props) {
  // calculate the date and time from unix timestamp and presents 3 lettersrs of the day

  let date = new Date(props.timestamp);
  let day = date.toLocaleDateString("en-US", { weekday: "short" });

  return <div>{day}</div>;
}
