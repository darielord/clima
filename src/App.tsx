import { useState, type ReactNode } from "react";
import { usePlaces } from "./usePlaces";
import { useDebounce } from "./useDebounce";
import { type Place } from "./types";
import { renderWeather } from "./renderWeather";
import { type Unit } from "./units";

import { useWeather } from "./useWeather";

export function App() {
  const [text, setText] = useState("");
  const debouncedText = useDebounce(text, 500);

  const [unit, setUnit] = useState<Unit>("C");

  const state = usePlaces(debouncedText);

  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const weather = useWeather(selectedPlace);

  let content: ReactNode;

  switch (state.status) {
    case "idle":
      content = <p>{"Escribe ciudad"}</p>;
      break;
    case "loading":
      content = <p> {"Buscando..."} </p>;
      break;
    case "error":
      content = <p> {"error algo fallo"} </p>;

      break;
    case "success":
      if (state.data.length === 0) {
        content = <p> {"sin resultados"} </p>;
      } else {
        content = (
          <ul>
            {state.data.map((el) => (
              <li key={el.id}>
                <button onClick={() => setSelectedPlace(el)}>{el.name} </button>
              </li>
            ))}
          </ul>
        );
      }
      break;
  }

  return (
    <div className="App">
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={() => setUnit(unit === "C" ? "F" : "C")}>
        Cambiar a {unit === "C" ? "F" : "C"}{" "}
      </button>
      {content}
      {renderWeather(weather, unit)}
    </div>
  );
}

export default App;
