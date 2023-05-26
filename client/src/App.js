import './App.css';
import GameManager from './components/gameManager';
import { v4 as uuidv4 } from 'uuid';


function App() {
  
  const userId = uuidv4();
  
  return (
    <div style={{width:'40vw'}}> 
      <GameManager userId={userId}></GameManager>
    </div>
  )
}

export default App;
