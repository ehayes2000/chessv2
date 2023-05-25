import { io } from 'socket.io-client';

// const api_base = "http://chessapp-env.eba-ds87phsx.us-west-2.elasticbeanstalk.com:8080";
const api_base = 'http://localhost:8080';
export default function WebsocketClient() {
    const sendMessage = (topic, data) => {

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
    return sendMessage;
}

