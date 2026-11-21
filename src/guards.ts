import type { DailyForecast } from "./days";
import { type Place } from "./types";
import { type GeocodingReply } from "./types";
import { type CurrentWeather } from "./types";
import { type ForecastReply } from "./types";
import type { DailyReply } from "./days";

export function isPlace(value: unknown): value is Place {
  return (
    value !== null &&
    typeof value === "object" &&
    "id" in value &&
    "name" in value &&
    "latitude" in value &&
    "longitude" in value &&
    "country" in value &&
    typeof value.name === "string" &&
    typeof value.country === "string" &&
    typeof value.id === "number" &&
    typeof value.latitude === "number" &&
    typeof value.longitude === "number" &&
    (!("admin1" in value) ||
      ("admin1" in value && typeof value.admin1 === "string"))
  );
}
export function isGeocodingReply(value: unknown): value is GeocodingReply {
  return (
    value !== null &&
    typeof value === "object" &&
    (!("results" in value) ||
      ("results" in value &&
        Array.isArray(value.results) &&
        value.results.every(isPlace)))
  );
}

export function isCurrentWeather(value: unknown): value is CurrentWeather {
  return (
    value !== null &&
    typeof value === "object" &&
    "temperature_2m" in value &&
    "wind_speed_10m" in value &&
    "relative_humidity_2m" in value &&
    "weather_code" in value &&
    typeof value.temperature_2m === "number" &&
    typeof value.relative_humidity_2m === "number" &&
    typeof value.weather_code === "number" &&
    typeof value.wind_speed_10m === "number"
  );
}

export function isForecastReply(value: unknown): value is ForecastReply {
  return (
    value !== null &&
    typeof value === "object" &&
    "current" in value &&
    isCurrentWeather(value.current)
  );
}

export function isDailyForecast(value: unknown): value is DailyForecast {
  return (
    value !== null &&
    typeof value === "object" &&
    "time" in value &&
    "weather_code" in value &&
    "temperature_2m_max" in value &&
    "temperature_2m_min" in value &&
    Array.isArray(value.temperature_2m_max) &&
    Array.isArray(value.temperature_2m_min) &&
    Array.isArray(value.time) &&
    value.time.every((item) => typeof item === "string") &&
    value.temperature_2m_max.every((item) => typeof item === "number") &&
    value.temperature_2m_min.every((item) => typeof item === "number") &&
    Array.isArray(value.weather_code) &&
    value.weather_code.every((item) => typeof item === "number") &&
    value.time.length === value.temperature_2m_max.length &&
    value.time.length === value.temperature_2m_min.length &&
    value.time.length === value.weather_code.length
  );
}

export function isDailyReply(value: unknown): value is DailyReply {
  return (
    value !== null &&
    typeof value === "object" &&
    "daily" in value &&
    isDailyForecast(value.daily)
  );
}
