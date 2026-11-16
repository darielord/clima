import { useEffect, useState } from "react";
import { searchPlaces } from "./searchPlaces";
import { type RequestState } from "./types";
import { type Place } from "./types";

import { type ApiError } from "./types";


export function usePlaces(query: string): RequestState<readonly Place[], ApiError>{
    const [state, setState] = useState<RequestState<readonly Place[], ApiError>>( {  status: 'idle'} )

    useEffect(()=>{


        const controller =new AbortController()

 

        async function load(){

             setState({  status: 'loading'})
const search = await  searchPlaces(query, controller.signal)
if( controller.signal.aborted){
    return
}
if(search.ok){
    setState(   {   status: "success",   data: search.data})
}else{
    setState( {  status:"error",   error:  search.error }   )
}

        }
load()
        return ()=> controller.abort()
    },[query])

     return state
}
