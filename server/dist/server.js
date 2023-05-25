"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const sessionManager_1 = require("./sessionManager");
const uuid_1 = require("uuid");
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
const port = 8080;
const root_dir = null;
const static_client = __dirname.split('/').slice(0, -2).join('/') + '/client/build';
app.use(express_1.default.static(static_client));
const sessionManager = new sessionManager_1.SessionManager();
app.get('/', (req, res) => {
    res.sendFile(static_client + '/index.html');
});
io.on('connection', (socket) => {
    let id = socket.handshake.query.playerId;
    if ((typeof id) !== "string") {
        id = (0, uuid_1.v4)();
    }
    const userId = String(id);
    sessionManager.addConnection(userId, socket);
    socket.on('disconnect', () => {
        console.log("disconnect");
        sessionManager.removeConnection(socket);
    });
});
httpServer.listen(port, () => {
    console.log(`Listening on ${port}`);
});
