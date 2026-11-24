import { useState, type ReactNode } from "react";
import { usePlaces } from "./usePlaces";
import { useDebounce } from "./useDebounce";
import { type Place } from "./types";
import { renderWeather } from "./renderWeather";
import { type Unit } from "./units";
import { loadHistory, loadLastPlace } from "./storage";
import { saveHistory } from "./storage";
import { saveLastPlace } from "./storage";
import { useWeather } from "./useWeather";
import { WeatherCanvas } from "./WeatherCanvas";
import { useForecast } from "./useForecast";
import { renderForecast } from "./renderForecast";
import { errorMessage } from "./errorMessage";
import { addToHistory } from "./history";
import { getWeatherKind } from "./weatherKind";
export function App() {
  const [text, setText] = useState("");
  const debouncedText = useDebounce(text, 500);

  const [unit, setUnit] = useState<Unit>("C");

  const state = usePlaces(debouncedText);

  const [selectedPlace, setSelectedPlace] = useState<Place | null>(() =>
    loadLastPlace(),
  );

  const [history, setHistory] = useState<readonly Place[]>(() => loadHistory());

  function choosePlace(place: Place) {
    const updated = addToHistory(history, place);

    saveHistory(updated);

    setHistory(updated);

    saveLastPlace(place);
    setSelectedPlace(place);
  }

  const weather = useWeather(selectedPlace);

  const forecast = useForecast(selectedPlace);

  let content: ReactNode;

  switch (state.status) {
    case "idle":
      content = <p>{"Escribe ciudad"}</p>;
      break;
    case "loading":
      content = <p> {"Buscando..."} </p>;
      break;
    case "error":
      content = <p> {errorMessage(state.error)} </p>;

      break;
    case "success":
      if (state.data.length === 0) {
        content = <p> {"sin resultados"} </p>;
      } else {
        content = (
          <ul>
            {state.data.map((el) => (
              <li key={el.id}>
                <button
                  onClick={() => {
                    choosePlace(el);
                  }}
                >
                  {el.name}{" "}
                </button>
              </li>
            ))}
          </ul>
        );
      }
      break;
  }

  const kind =
    weather.status === "success"
      ? getWeatherKind(weather.data.weather_code)
      : "unknown";

  return (
    <div className="App">
      <WeatherCanvas kind={kind} />
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={() => setUnit(unit === "C" ? "F" : "C")}>
        Cambiar a {unit === "C" ? "F" : "C"}{" "}
      </button>
      {content}
      {renderWeather(weather, unit)}
      {renderForecast(forecast, unit)}

      <h3>Recientes</h3>
      <ul>
        {history.map((item) => (
          <li key={item.id}>
            {" "}
            <button onClick={() => choosePlace(item)}>{item.name} </button>{" "}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
