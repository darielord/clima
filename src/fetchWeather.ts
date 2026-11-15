
import { type CurrentWeather } from "./types"
import {type ApiError } from "./types"
import { fetchJson } from "./fetchJson"
import { type Result } from "./types"

import { isForecastReply } from "./guards"
export async function   fetchWeather(latitude:number, longitude: number, signal:AbortSignal): Promise<Result<CurrentWeather,ApiError>>{


    const url =   `https://api.open-meteo.com/v1/forecast?latitude=${ latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`

  const result = await  fetchJson(url, isForecastReply, signal)


  if(!result.ok){
    return result
  }else{
    return {ok: true, data:  result.data.current}
  }
}


const abort = new AbortController()

const Weather = await fetchWeather(18.47, -69.9, abort.signal)
console.log(Weather)