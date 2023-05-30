import { Socket } from 'socket.io';
import { activeGame } from './gameManager';

export class SessionManager { 
    activeSessions: Map<string, Socket>; // userId -> socket
    activeSockets: Map<string, string>; // socketId -> userId
    constructor() {
        this.activeSessions = new Map();
        this.activeSockets = new Map();
        this.addConnection = this.addConnection.bind(this);
        this.removeConnection = this.removeConnection.bind(this);
    }

    addConnection(userId: string, connection: Socket): true{
        this.activeSessions.set(userId, connection);
        this.activeSockets.set(connection.id, userId);
        return true;
    }
    
    removeConnection(connection: Socket): boolean{
        if (!this.activeSockets.has(connection.id))
            return false;
        
        const playerId: string = this.activeSockets.get(connection.id)!;
        this.activeSockets.delete(connection.id);
        this.activeSessions.delete(playerId);  
        return true;
    }
}