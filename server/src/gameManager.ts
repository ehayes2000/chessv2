import { Chess, ChessInstance } from 'chess.js';
import { timeStamp } from 'console';
import { StringifyOptions } from 'querystring';
import { v4 as uuidv4, v4 } from 'uuid';

type game = {
    playerB: string,
    playerW: string, 
    game: ChessInstance
}

export class GameManager {
    activeGames: Map<string, string>;
    games: Map<string, game>;

    constructor() {
        this.activeGames = new Map();
        this.games = new Map();
    } 

    createGame(userIdW: string, userIdB: string){
        const gameId = v4();
        const newGame: game = {
            playerW: userIdW,
            playerB: userIdB,
            game: new Chess()
        }
        this.games.set(gameId, newGame);
        this.activeGames.set(userIdW, gameId);
        this.activeGames.set(userIdB, gameId);
        return gameId;
    }
    closeGame(gameId: string){
        if (!this.games.has(gameId))
            return false;
        const playerB: string = this.games.get(gameId)!.playerB;
        const playerW: string = this.games.get(gameId)!.playerW;
        this.activeGames.delete(playerB);
        this.activeGames.delete(playerW);
        this.games.delete(gameId);
        return true;
    }

}