import { type Result } from "./types";

import { type ApiError } from "./types";

 
export async function fetchJson<T>(url: string, guard: (value: unknown) => value is T, signal: AbortSignal): Promise< Result<T, ApiError>>{

try{

 

    const response = await fetch(url, {signal})

    if(!response.ok){
        return {ok: false, error: {kind: 'http', status: response.status}}
    }

    let data: unknown    

try{
    data = await response.json()
}catch{

    return {ok: false, error: {kind: 'invalid-data'}}
}

        if(guard(data)){
        return {ok: true, data: data}
    }else{
        return {ok: false, error: {kind: 'invalid-data'}}
    }

}catch{


    return(

        {  ok: false, error: {kind: 'network'}}
     )
}

}


 