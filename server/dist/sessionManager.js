"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionManager = void 0;
class SessionManager {
    constructor() {
        this.activeSessions = new Map();
        this.activeSockets = new Map();
    }
    addConnection(userId, connection) {
        this.activeSessions.set(userId, connection);
        this.activeSockets.set(connection.id, userId);
        console.log("ADD CONNECTION");
        console.log("map: ", this.activeSockets);
        console.log(this.activeSessions);
        return true;
    }
    removeConnection(connection) {
        if (!this.activeSockets.has(connection.id))
            return false;
        const playerId = this.activeSockets.get(connection.id);
        this.activeSockets.delete(connection.id);
        this.activeSessions.delete(playerId);
        console.log(JSON.stringify(this.activeSessions));
        console.log(JSON.stringify(this.activeSessions));
        return true;
    }
}
exports.SessionManager = SessionManager;
