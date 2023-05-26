import React, { useState, useEffect } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';

/*
props:
    boolean is_legal(from, to) check of moving from to is legal
*/

// make 0 api calls here

export default function Board(props){
    const serverUserColor = props.serverUserColor;
    const serverBoardPosition = props.serverBoardPosition;
    const serverMakeMove = props.serverMakeMove;
    const boardOrientation = props.boardOrientation;
   
    const [clientGameState, setClientGameState] = useState(new Chess());
    const [clientBoardPosition, setClientBoardPosition] = useState(null);
    // sync client board and client game engine with server returned FENs
    useEffect(()=>{
        clientGameState.load(serverBoardPosition);
        setClientBoardPosition(serverBoardPosition)
    }, [serverBoardPosition])


    async function onDrop(from, to){
        let moveColor = clientGameState.get(from).color;
        if (clientGameState.get(from) && clientGameState.get(from).color !== serverUserColor){
            console.log('rejected wrong color')
            return false;
        }
        try{
            clientGameState.move({from: from, to: to});
        } catch(invalidMove){
            console.log('rejected illegalMove')
            return false;
        }
        console.log('sent move');
        setClientBoardPosition(clientGameState.fen());
        serverMakeMove(from+to);
    }
    
    return <Chessboard 
        onPieceDrop={onDrop}
        position={clientBoardPosition}
        boardOrientation={boardOrientation}/>
}