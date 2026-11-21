export type Unit = "C" | "F";

export function convertTemperature(celsius: number, unit: Unit): number {
  if (unit === "C") {
    return celsius;
  } else {
    return (celsius * 9) / 5 + 32;
  }
}
