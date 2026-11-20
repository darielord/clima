import { type RequestState } from "./types";
import { describeWeather } from "./weatherKind";

import { type CurrentWeather } from "./types";
import { type ApiError } from "./types";
import { type ReactNode } from "react";

export function renderWeather(
  render: RequestState<CurrentWeather, ApiError>,
): ReactNode {
  const state = render;

  switch (state.status) {
    case "idle":
      return <p>{"Elige un lugar"}</p>;

    case "loading":
      return <p>{"Cargando clima..."}</p>;

    case "success":
      return (
        <div className="clima">
          <p>Temperatura:{state.data.temperature_2m} °C</p>
          <p> Humedad: {state.data.relative_humidity_2m}%</p>
          <p> Viento: {state.data.wind_speed_10m}km/h</p>{" "}
          <p> Clima: {describeWeather(state.data.weather_code)}</p>
        </div>
      );
    case "error":
      return <p>{"Error"} </p>;
    default:
      const def: never = state;
      throw new Error(def);
  }
}
