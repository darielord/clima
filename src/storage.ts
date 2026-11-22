import { isPlace } from "./guards";
import type { Place } from "./types";

const LAST_PLACE_KEY = "clima:lastPlace";

export function saveLastPlace(place: Place): void {
  localStorage.setItem(LAST_PLACE_KEY, JSON.stringify(place));
}

export function loadLastPlace(): Place | null {
  const saved: string | null = localStorage.getItem(LAST_PLACE_KEY);

  if (saved === null) {
    return null;
  }

  let data: unknown;

  try {
    data = JSON.parse(saved);
  } catch {
    return null;
  }

  if (isPlace(data)) {
    return data;
  }

  return null;
}
