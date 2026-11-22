import type { Place } from "./types";

const MAX_HISTORY = 5;

export function addToHistory(
  history: readonly Place[],
  place: Place,
): readonly Place[] {
  const historyFilter = history.filter((item) => item.id !== place.id);

  const updated = [place, ...historyFilter];

  return updated.slice(0, MAX_HISTORY);
}
