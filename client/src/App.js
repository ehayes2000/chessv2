import './App.css';
import { useState } from 'react';
import Board from './components/board'
import GameManager from './components/gameManager';
import { Chess } from 'chess.js';




function App() {
  return (
    <div style={{width:'40vw'}}> 
      <GameManager></GameManager>
    </div>
  )
}

export default App;
