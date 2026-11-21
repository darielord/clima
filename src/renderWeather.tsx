import { type RequestState } from "./types";
import { describeWeather } from "./weatherKind";
import type { Unit } from "./units";
import { type CurrentWeather } from "./types";
import { type ApiError } from "./types";
import { type ReactNode } from "react";
import { convertTemperature } from "./units";
import { errorMessage } from "./errorMessage";

export function renderWeather(
  render: RequestState<CurrentWeather, ApiError>,
  unit: Unit,
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
          <p> Humedad: {state.data.relative_humidity_2m}%</p>
          <p> Viento: {state.data.wind_speed_10m}km/h</p>{" "}
          <p> clima: {describeWeather(state.data.weather_code)}</p>
          <p>
            {" "}
            Temperatura:{convertTemperature(state.data.temperature_2m, unit)}°
            {unit}
          </p>
        </div>
      );
    case "error":
      return <p>{errorMessage(state.error)} </p>;
    default:
      const def: never = state;
      throw new Error(def);
  }
}
