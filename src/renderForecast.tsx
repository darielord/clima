import { type RequestState } from "./types";
import { describeWeather } from "./weatherKind";
import type { Unit } from "./units";
import { type ApiError } from "./types";
import { type ReactNode } from "react";
import { convertTemperature } from "./units";
import type { DayForecast } from "./days";

export function renderForecast(
  render: RequestState<readonly DayForecast[], ApiError>,
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
        <div className="forecast">
          <ul>
            {state.data.map((day) => {
              return (
                <li key={day.date}>
                  {day.date} {describeWeather(day.code)}{" "}
                  {convertTemperature(day.max, unit)}°{unit} Y{" "}
                  {convertTemperature(day.min, unit)}°{unit}
                </li>
              );
            })}
          </ul>
        </div>
      );
    case "error":
      return <p>{"Error"} </p>;
    default:
      const def: never = state;
      throw new Error(def);
  }
}
