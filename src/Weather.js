import React from "react";
import axios from "axios";

export default function Weather(props) {
  function handleResponse(response) {
    console.log(response.data);
    alert(`The temp in ${props.city} is ${response.data.temperature.current}
      `);
  }

  let apiKey = "95c40b01td464da65f4f835cof7b5c75";
  let endpoint = `https://api.shecodes.io/weather/v1/current?query=${props.city}&key=${apiKey}&units=metric`;
  axios
    .get(endpoint)
    .then(handleResponse)
    .catch(function (error) {
      console.log(error);
      alert(`Sorry, we did not find ${props.city}`);
    });

  return <div>gfgf</div>;
}
