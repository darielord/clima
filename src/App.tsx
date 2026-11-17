 
import { useState, type ReactNode } from "react";
import { usePlaces } from "./usePlaces";

export function App(){

const [text, setText] = useState('')

const state =usePlaces(text)

let content: ReactNode

 switch (state.status) {
    case 'idle':
         content =  <p>{'Escribe ciudad'}</p>
        break;
 case 'loading':
 content = <p> {'Buscando...'} </p>
     break;
 case 'error':
    content = <p> {'error algo fallo'} </p>
    
        break;
case 'success': 
 
if(state.data.length === 0){
    content = <p> {'sin resultados'} </p>
}else{
   content =  <ul> {state.data.map((el)=> <li key={el.id }>{el.name}</li>)} </ul>
}
break;
 }

return ( 
    <div className="App">

        <input value={text}  onChange={(e)=> setText(e.target.value)}/> 
 {content}
 
    </div>
)

}

export default App