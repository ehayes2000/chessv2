import express, {Express, Request, Response} from 'express';
import { Server as IOServer, Socket } from 'socket.io';
import { createServer, Server as HttpServer } from 'http';
import { SessionManager } from './sessionManager';
import { randomUUID } from 'crypto';
import { v4 as uuidv4 } from 'uuid';

const app: Express = express();
const httpServer: HttpServer = createServer(app);
const io: IOServer = new IOServer(httpServer);


const port = 8080;
const root_dir = null;
const static_client = __dirname.split('/').slice(0,-2).join('/') + '/client/build'
app.use(express.static(static_client))

const sessionManager: SessionManager = new SessionManager();

app.get('/', (req: Request, res: Response)=>{
    res.sendFile(static_client + '/index.html');
});



io.on('connection', (socket: Socket) => {
    let id = socket.handshake.query.playerId;
    if ((typeof id) !== "string"){
        id = uuidv4();
    }

    const userId: string = String(id);
    sessionManager.addConnection(userId, socket);

    socket.on('disconnect', () => {
        console.log("disconnect")
        sessionManager.removeConnection(socket);
    }
    )
})

httpServer.listen(port, () => {
    console.log(`Listening on ${port}`);
    
})