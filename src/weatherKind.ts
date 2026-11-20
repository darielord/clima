export type WeatherKind =
  | "clear"
  | "cloudy"
  | "fog"
  | "rain"
  | "snow"
  | "storm"
  | "unknown";

export function getWeatherKind(code: number): WeatherKind {
  if (code === 0) {
    return "clear";
  } else if (code >= 1 && code <= 3) {
    return "cloudy";
  } else if (code === 45 || code === 48) {
    return "fog";
  } else if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) {
    return "rain";
  } else if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) {
    return "snow";
  } else if (code >= 95 && code <= 99) {
    return "storm";
  } else {
    return "unknown";
  }
}

export const KIND_TEXT: Record<WeatherKind, string> = {
  cloudy: "nublado",
  clear: "claro",
  fog: "niebla",
  snow: "nieve",
  storm: "tormenta",
  rain: "lluvia",
  unknown: "desconocido",
};

export function describeWeather(code: number): string {
  const kind = getWeatherKind(code);

  return KIND_TEXT[kind];
}
