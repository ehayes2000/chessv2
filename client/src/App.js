import './App.css';
import GameManager from './components/gameManager';
// import { io } from 'socket.io-client';
import WebsocketClient from './helper/websocketClient';

function App() {
  
  const sendMessage = WebsocketClient();
  
  return (
    <div style={{width:'40vw'}}> 
      <GameManager></GameManager>
    </div>
  )
}

export default App;
