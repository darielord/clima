import { useEffect, useState } from "react";

export   function useDebounce<T>(valor: T, timeout = 300): T{
    const [state, setState] = useState<T>(valor)

    useEffect(()=>{

        const temp = setTimeout(()=>{
setState(valor)
        },timeout)
        

        return ()=> clearTimeout(temp)
    },[valor, timeout])

    return state


}