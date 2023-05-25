import './App.css';
import GameManager from './components/gameManager';
// import { io } from 'socket.io-client';


function App() {
  
  
  
  return (
    <div style={{width:'40vw'}}> 
      <GameManager userId='test-player'></GameManager>
    </div>
  )
}

export default App;
