
import { type Place } from "./types";
import { type GeocodingReply } from "./types";
import {type CurrentWeather} from './types'
import {type ForecastReply} from './types' 

export function  isPlace(value:unknown): value is Place{
    return (

        value !== null &&
        typeof value === "object" &&
        "id" in value &&  "name" in value && "latitude" in value &&
        "longitude" in value &&
        "country" in value &&   
        typeof value.name === 'string' && 
        typeof value.country === 'string' &&
        typeof value.id === 'number' &&
        typeof value.latitude === 'number' &&
        typeof value.longitude === 'number'
        && (!( "admin1" in value)|| ("admin1" in value && typeof value.admin1 === 'string')   )
 
    )
}
export function  isGeocodingReply(value:unknown): value is GeocodingReply{
    return (

        value !== null &&
        typeof value === "object" &&
        (!( "results" in value)|| ("results" in value &&  Array.isArray(value.results) && value.results.every(isPlace) )  
       
 
 
    )

)
}


export function  isCurrentWeather(value:unknown): value is CurrentWeather{
    return (

        value !== null &&
        typeof value === "object" &&
        "temperature_2m" in value 
         && 
         "wind_speed_10m" in value
          && "relative_humidity_2m" in value
           && "weather_code" in value &&   
        typeof value.temperature_2m === 'number' && 
        typeof value.relative_humidity_2m === 'number' &&
        typeof value.weather_code === 'number' &&
        typeof value.wind_speed_10m === 'number'  
 
         
 
    )
}


export function  isForecastReply(value:unknown): value is ForecastReply{
    return (

        value !== null &&
        typeof value === "object" &&
        'current' in value && 
 isCurrentWeather(value.current)
         
 
    )
}
 
 