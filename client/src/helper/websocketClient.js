import { io } from 'socket.io-client';

// const api_base = "http://chessapp-env.eba-ds87phsx.us-west-2.elasticbeanstalk.com:8080";
const api_base = 'http://localhost:8080';
export default function WebsocketClient(setBoard, setStatus, setColor) {
    const sendMessage = (topic, data) => { 
        socket.emit(topic, data);
    }
    const socket = io(api_base, {
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
    
    socket.on('board-update', (data) => {
        setBoard(data.fen);
    });
    
    socket.on('status-update', (data) => {
        setStatus(data.status)
    })

    socket.on('color-update', (data) => {
        setColor(data.color)
    })
    return sendMessage;
}

