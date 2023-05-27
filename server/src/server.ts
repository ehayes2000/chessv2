import express, {Express, Request, Response} from 'express';
import { Server as IOServer, Socket } from 'socket.io';
import { createServer, Server as HttpServer } from 'http';
import { v4 as uuidv4 } from 'uuid';
import { Chess } from 'chess.js';
import { SessionManager } from './sessionManager';
import { GameManager, activeGame } from './gameManager';
import { MatchMaker } from './matchMaker';


const app: Express = express();
const httpServer: HttpServer = createServer(app);
const io: IOServer = new IOServer(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});


const port = 8080;
const root_dir = null;
const static_client = __dirname.split('/').slice(0,-2).join('/') + '/client/build'
app.use(express.static(static_client))

const sessionManager: SessionManager = new SessionManager();
const gameManager: GameManager = new GameManager();
const matchMaker: MatchMaker = new MatchMaker(gameManager.createGame);

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
    // connect player to game in progress
    if (gameManager.activeGames.has(userId)){
        const gameId: string = gameManager.activeGames.get(userId)!;
        const game: activeGame = gameManager.games.get(gameId)!;
        socket.emit('status-update', JSON.stringify({'status': 'active'}));
        socket.emit('board-update', JSON.stringify({'fen': (game.game as Chess).fen()}));
        if (game.playerB === userId){
            socket.emit('color-update', JSON.stringify({'color': 'b'}));
        } else{
            socket.emit('color-update', JSON.stringify({'color': 'w'}));
        }    
    }

    socket.on('disconnect', () => {
        const playerId: string = sessionManager.activeSockets.get(socket.id)!;
        const gameId: string | undefined = gameManager.activeGames?.get(playerId);
        if (gameId != null){
            const game: activeGame = gameManager.games.get(gameId)!;
            // if both disconnected close game
            if (game.playerB === playerId && !sessionManager.activeSessions.has(game.playerW)){
                console.log("game closed");
                gameManager.closeGame(gameId);
            }
            if (game.playerW === playerId && !sessionManager.activeSessions.has(game.playerB)){
                console.log("game closed");
                gameManager.closeGame(gameId);
            }
        }
        console.log("disconnected");
        sessionManager.removeConnection(socket);
    });

    socket.on('move', (data) => {
        data = JSON.parse(data);
        const userId = data.userId;
        const move = data.move;
        if (userId == null || move == null)
            return;
        if (!gameManager.activeGames.has(userId))
            return;
        const gameId: string = gameManager.activeGames.get(userId)!;
        const game: activeGame = gameManager.games.get(gameId)!;

        if (game.playerB === userId && (game.game as Chess).turn() == 'w')
            return;
        if (game.playerW === userId && (game.game as Chess).turn() == 'b')
            return;
       
        if(gameManager.makeMove(gameId, move)){
            const newFen = (game.game as Chess).fen();
            sessionManager.activeSessions.get(game.playerB)?.emit('board-update',JSON.stringify({'fen': newFen}));
            sessionManager.activeSessions.get(game.playerW)?.emit('board-update',JSON.stringify({'fen': newFen})); 
        } else{ 
            const fen = (game.game as Chess).fen();
            sessionManager.activeSessions.get(userId)?.emit('board-update',JSON.stringify({'fen': fen}));
        }
        const flag = {};
        if (gameManager.statusUpdate(gameId, flag)){
            sessionManager.activeSessions.get(game.playerB)?.emit('status-update', JSON.stringify(flag));
            sessionManager.activeSessions.get(game.playerW)?.emit('status-update', JSON.stringify(flag));
            console.log("game closed");
            gameManager.closeGame(gameId);
        }
        
    });
    
    socket.on('play-online', (data) => {
        data = JSON.parse(data);
        const userId: string | null = data.userId;

        if (userId == null)
            return;
       
        if (gameManager.activeGames.has(userId))
            return;
     
        const gameId: string | null = matchMaker.findGame(userId);
        if (gameId == null)
            return;
        const game: activeGame = gameManager.games.get(gameId)!;

        
        const socketB = sessionManager.activeSessions.get(game.playerB);
        socketB?.emit('status-update', JSON.stringify({'status': 'active'}));
        socketB?.emit('board-update', JSON.stringify({'fen': (game.game as Chess).fen()}));
        socketB?.emit('color-update', JSON.stringify({'color': 'b'}));
    
        const socketW = sessionManager.activeSessions.get(game.playerW);
        socketW?.emit('status-update', JSON.stringify({'status': 'active'}));
        socketW?.emit('board-update', JSON.stringify({'fen': (game.game as Chess).fen()}));
        socketW?.emit('color-update', JSON.stringify({'color': 'w'}));
       
    })
});



httpServer.listen(port, () => {
    console.log(`Listening on ${port}`);
})