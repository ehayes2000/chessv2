import { Socket } from 'socket.io';

export class SessionManager { 
    activeSessions: Map<string, Socket>; // user id: socket
    activeSockets: Map<string, string>;
    constructor() {
        this.activeSessions = new Map();
        this.activeSockets = new Map();
    }

    addConnection(userId: string, connection: Socket){
        this.activeSessions.set(userId, connection);
        this.activeSockets.set(connection.id, userId);
     
        return true;
    }
    removeConnection(connection: Socket){
        if (!this.activeSockets.has(connection.id))
            return false;
        
        const playerId: string = this.activeSockets.get(connection.id)!;
        this.activeSockets.delete(connection.id);
        this.activeSessions.delete(playerId);  
        return true;
    }
}