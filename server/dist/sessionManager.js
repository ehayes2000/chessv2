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
        return true;
    }
    removeConnection(connection) {
        if (!this.activeSockets.has(connection.id))
            return false;
        const playerId = this.activeSockets.get(connection.id);
        this.activeSockets.delete(connection.id);
        this.activeSessions.delete(playerId);
        return true;
    }
}
exports.SessionManager = SessionManager;
