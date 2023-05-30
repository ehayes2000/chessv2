import express, {Express, Request, Response} from 'express';
import { createServer, Server as HttpServer } from 'http';
import { Server as IOServer, Socket } from 'socket.io';


const app: Express = express();
const httpServer: HttpServer = createServer(app);
const io: IOServer = new IOServer(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

export { app, httpServer, io };



