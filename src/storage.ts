import { isPlace } from "./guards";
import type { Place } from "./types";

const LAST_PLACE_KEY = "clima:lastPlace";

const HISTORY_KEY = "clima:history";

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

export function saveHistory(history: readonly Place[]): void {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function loadHistory(): Place[] {
  const saved: string | null = localStorage.getItem(HISTORY_KEY);

  if (saved === null) {
    return [];
  }

  let data: unknown;

  try {
    data = JSON.parse(saved);
  } catch {
    return [];
  }

  if (Array.isArray(data) && data.every(isPlace)) {
    return data;
  }

  return [];
}
