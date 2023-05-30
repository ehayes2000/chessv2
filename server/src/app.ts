import { httpServer } from "./server";
import { SessionManager } from './logic/sessionManager';
import { GameManager, activeGame } from './logic/gameManager';
import { MatchMaker } from './logic/matchMaker';
import './routes';
import { attachHandlers } from './socketHandlers';

const sessionManager: SessionManager = new SessionManager();
const gameManager: GameManager = new GameManager();
const matchMaker: MatchMaker = new MatchMaker(gameManager.createGame);

attachHandlers(sessionManager, gameManager, matchMaker);

httpServer.listen(8080, () => {
    console.log(`[Server]: I am running at https://localhost:8080`);
});