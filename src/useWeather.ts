import { useEffect, useState } from "react";
import { type CurrentWeather, type RequestState } from "./types";
import { type ApiError } from "./types";
import { type Place } from "./types";
import { fetchWeather } from "./fetchWeather";

export function useWeather(
  place: Place | null,
): RequestState<CurrentWeather, ApiError> {
  const [state, setState] = useState<RequestState<CurrentWeather, ApiError>>({
    status: "idle",
  });

  useEffect(() => {
    if (place === null) {
      setState({ status: "idle" });
      return;
    }

    const latitude =  place.latitude
    const longitude = place.longitude
    const controller = new AbortController();

    async function load() {
      setState({ status: "loading" });
      const weather = await fetchWeather(latitude, longitude, controller.signal);
      if (controller.signal.aborted) {
        return;
      }
      if (weather.ok) {
        setState({ status: "success", data: weather.data });
      } else {
        setState({ status: "error", error: weather.error });
      }
    }
    load();
    return () => controller.abort();
  }, [place]);

  return state;
}
