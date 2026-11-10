
export type Place = {
    readonly id: number
    readonly name: string
    readonly latitude: number
    readonly longitude: number
    readonly country: string
    readonly admin1?: string

}

export type GeocodingReply = {
    readonly results?: readonly Place[]
}

export type CurrentWeather = {
    readonly temperature_2m: number
    readonly relative_humidity_2m: number
    readonly weather_code: number
    readonly wind_speed_10m: number

}

export type ForecastReply = {
    readonly current: CurrentWeather
}


export type ApiError =   | {readonly kind: 'network'} | {readonly kind: 'http', readonly status: number} | {readonly kind: 'invalid-data'}

export type Result<T, E>  = { readonly ok: true, readonly data: T}   | {readonly ok: false, readonly error: E}

export type RequestState<T, E> =  | {readonly status: 'loading'}  | {readonly status: 'idle'}  |  { readonly status: "success", readonly data: T}  | {readonly status:"error", readonly error: E}