import { useEffect, useState } from "react";
import { type RequestState } from "./types";
import { type ApiError } from "./types";
import { type Place } from "./types";

import type { DayForecast } from "./days";
import { fetchForecast } from "./fetchForecast";

export function useForecast(
  place: Place | null,
): RequestState<readonly DayForecast[], ApiError> {
  const [state, setState] = useState<
    RequestState<readonly DayForecast[], ApiError>
  >({
    status: "idle",
  });

  useEffect(() => {
    if (place === null) {
      setState({ status: "idle" });
      return;
    }

    const latitude = place.latitude;
    const longitude = place.longitude;
    const controller = new AbortController();

    async function load() {
      setState({ status: "loading" });
      const forecast = await fetchForecast(
        latitude,
        longitude,
        controller.signal,
      );
      if (controller.signal.aborted) {
        return;
      }
      if (forecast.ok) {
        setState({ status: "success", data: forecast.data });
      } else {
        setState({ status: "error", error: forecast.error });
      }
    }
    load();
    return () => controller.abort();
  }, [place]);

  return state;
}
