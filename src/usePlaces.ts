import { useEffect, useState } from "react";
import { searchPlaces } from "./searchPlaces";
import { type RequestState } from "./types";
import { type Place } from "./types";
 

import { type ApiError } from "./types";


const MIN_LETTERS = 2
 

export function usePlaces(query: string): RequestState<readonly Place[], ApiError>{
    const [state, setState] = useState<RequestState<readonly Place[], ApiError>>( {  status: 'idle'} )
     const textoRecortao = query.trim()
    useEffect(()=>{



    

        if(textoRecortao.length < MIN_LETTERS){

     setState({status: 'idle'})
     return


        }


        const controller =new AbortController()

 

        async function load(){

             setState({  status: 'loading'})
const search = await  searchPlaces(textoRecortao, controller.signal)
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
    },[textoRecortao])

     return state
}
