 
import { useState } from "react";
import { usePlaces } from "./usePlaces";

export function App(){

const [text, setText] = useState('')

const state =usePlaces(text)


return ( 
    <div className="App">

        <input value={text}  onChange={(e)=> setText(e.target.value)}/> 
        <p>{state.status} </p>
    </div>
)

}export default App