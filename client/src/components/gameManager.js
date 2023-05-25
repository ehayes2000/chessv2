import React, { useState, useEffect } from 'react';
import Board from './board';
import WebsocketClient from '../helper/websocketClient';

export default function GameManager(userId) {
    const [serverBoardPosition, setServerBoardPosition] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
    const [serverUserColor, setServerUserColor] = useState('w');
    const [serverGameStatus, setServerGameStatus] = useState(null);
    // make api call with makeMove insert pId into call
    const sendMessage = WebsocketClient(setServerBoardPosition, setServerGameStatus, setServerUserColor);
    const makeMoveServer = (move) => { 
        sendMessage('move', JSON.stringify({
            move: move,
            userId: userId
        }));
    }

    return (
        <div>
            <button onClick={() => sendMessage('play-online', JSON.stringify({userId: userId}))}>
                play online
            </button>
            <Board 
            serverBoardPosition={serverBoardPosition}
            serverMakeMove={makeMoveServer}
            serverUserColor={serverUserColor}/>
           
        </div>
        
    )
}
