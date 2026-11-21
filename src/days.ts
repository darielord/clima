export type DailyForecast = {
  readonly time: readonly string[];
  readonly weather_code: readonly number[];
  readonly temperature_2m_max: readonly number[];
  readonly temperature_2m_min: readonly number[];
};

export type DailyReply = {
  readonly daily: DailyForecast;
};

export type DayForecast = {
  readonly date: string;
  readonly code: number;
  readonly max: number;
  readonly min: number;
};

export function toDays(daily: DailyForecast): readonly DayForecast[] {
  return daily.time.map((val, index) => {
    return {
      date: val,
      code: daily.weather_code[index],
      max: daily.temperature_2m_max[index],
      min: daily.temperature_2m_min[index],
    };
  });
}
