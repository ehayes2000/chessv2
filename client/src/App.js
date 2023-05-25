import './App.css';
import GameManager from './components/gameManager';
import { io } from 'socket.io-client';

function App() {
  const socket = io('http://localhost:8080', {
    query: {
      playerId: 'test-player-id'
    }
  });
  socket.on('connect', () => {
    console.log('connected');
  })

  socket.on('disconnect', () => {
    console.log('disconnected')
  })

  return (
    <div style={{width:'40vw'}}> 
      <GameManager></GameManager>
    </div>
  )
}

export default App;
