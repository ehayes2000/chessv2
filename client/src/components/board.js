import React, { useState, useEffect } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import { isLegal } from '../helper/isLegal';

/*
props:
    boolean is_legal(from, to) check of moving from to is legal
*/

// make 0 api calls here

export default function Board(props){
    const serverUserColor = props.serverUserColor;
    const serverBoardPosition = props.serverBoardPosition;
    const serverMakeMove = props.serverMakeMove;
    const [clientBoardPosition, setClientBoardPosition] = useState(null);
    const [clientGameState, setClientGameState] = useState(new Chess());
    
    // sync client board and client game engine with server returned FENs
    useEffect(()=>{
        clientGameState.load(serverBoardPosition);
        setClientBoardPosition(serverBoardPosition);
    }, [serverBoardPosition])


    async function onDrop(from, to){
      
        if (clientGameState.get(from) && clientGameState.get(from).color !== serverUserColor)
            return false;
           
        try{
            clientGameState.move({from: from, to: to});
        } catch(invalidMove){
            return false;
        }
        setClientBoardPosition(clientGameState.fen());
        serverMakeMove(from+to);
    }
    
    return <Chessboard 
        onPieceDrop={onDrop}
        position={clientBoardPosition}/>
}