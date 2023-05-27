import './App.css';
import GameManager from './components/gameManager';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';

function App() {
  
  const [playerId, setPlayerId] = useState(null);
  
  useEffect(() => {
    const id = localStorage.getItem("playerId");
    if (id == null){
      const newId = uuidv4();
      localStorage.setItem("playerId", newId);
      setPlayerId(newId);
    } else{
      setPlayerId(id);
    }
  }, []);


  return (
    <div style={{width:'40vw'}}> 
      <GameManager userId={playerId}></GameManager>
    </div>
  )
}

export default App;
