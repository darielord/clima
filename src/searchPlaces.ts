import { isGeocodingReply } from "./guards"
import type { ApiError } from "./types"
import { fetchJson } from "./fetchJson"
import { type Result } from "./types"

import { type Place } from "./types"

export async function searchPlaces(name: string, signal: AbortSignal): Promise< Result< readonly Place[], ApiError>>{


const url =`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(name)}&count=5`

const result = await fetchJson(url, isGeocodingReply, signal)

if(!result.ok){
    return result
}
return {ok: true, data: result.data.results??[]}
 


}