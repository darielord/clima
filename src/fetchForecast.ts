import { fetchJson } from "./fetchJson";
import type { ApiError } from "./types";

import { toDays } from "./days";

import { isDailyReply } from "./guards";

import { type Result } from "./types";

import type { DayForecast } from "./days";

export async function fetchForecast(
  latitude: number,
  longitude: number,
  signal: AbortSignal,
): Promise<Result<readonly DayForecast[], ApiError>> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;

  const result = await fetchJson(url, isDailyReply, signal);

  if (!result.ok) {
    return result;
  } else {
    return { ok: true, data: toDays(result.data.daily) };
  }
}
