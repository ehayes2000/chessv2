import React, { useState, useEffect } from 'react';
import Board from './board';
import WebsocketClient from '../helper/websocketClient';

export default function GameManager(props) {
    const userId = props.userId;
    const [serverBoardPosition, setServerBoardPosition] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
    const [serverUserColor, setServerUserColor] = useState('w');
    const [serverGameStatus, setServerGameStatus] = useState(null);
    const [boardOrientation, setBoardOrientation] = useState('white');
    //make api call with makeMove insert pId into call
    const sendMessage = WebsocketClient(setServerBoardPosition,
                                        setServerGameStatus,
                                        setServerUserColor,
                                        setBoardOrientation,
                                        userId);
    const makeMoveServer = (move) => { 
        sendMessage('move', JSON.stringify({
            move: move,
            userId: userId
        }));
    }

    if (userId == null){
        console.error("cannot create game manager with undefined userId")
        return null;
    }
    return (
        <div>
            <button onClick={() => sendMessage('play-online', JSON.stringify({userId: userId}))}>
                play online
            </button>
            <Board 
            serverBoardPosition={serverBoardPosition}
            serverMakeMove={makeMoveServer}
            serverUserColor={serverUserColor}
            boardOrientation={boardOrientation}/>
           
        </div>
    )
}
