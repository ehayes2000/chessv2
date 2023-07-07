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
        <div className="bg-gray-900 text-white h-full w-full flex items-center justify-center">
            <div className="flex flex-col-reverse md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-4/5 mx-auto">
                <div  className="md:w-1/2">
                <Board 
                    serverBoardPosition={serverBoardPosition}
                    serverMakeMove={makeMoveServer}
                    serverUserColor={serverUserColor}
                    boardOrientation={boardOrientation}
     
                />
                </div>
               
                <div className="flex flex-col items-center md:items-start space-y-4">
                    <button 
                        onClick={() => sendMessage('play-online', JSON.stringify({userId: userId}))} 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full md:w-auto"
                    >
                        Play Online
                    </button>
                    {serverGameStatus && (
                        <>
                            <button 
                                onClick={() => {/* handle offer draw */}} 
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full md:w-auto"
                            >
                                Offer Draw
                            </button>
                            <button 
                                onClick={() => {/* handle surrender */}} 
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full md:w-auto"
                            >
                                Surrender
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
