import React, { useState, useEffect } from 'react';
import Board from './board';

export default function GameManager() {
    const [serverBoardPosition, setServerBoardPosition] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
    const [serverUserColor, setServerUserColor] = useState('w');
    // make api call with makeMove insert pId into call
    const makeMoveServer = (move) => { }

    return (
        <Board 
        serverBoardPosition={serverBoardPosition}
        serverMakeMove={makeMoveServer}
        serverUserColor={serverUserColor}/>
        
    )
}
