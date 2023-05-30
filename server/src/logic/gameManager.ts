import { Chess } from 'chess.js';
import { timeStamp } from 'console';
import { StringifyOptions } from 'querystring';
import { v4 as uuidv4, v4 } from 'uuid';

export type activeGame = {
    playerB: string,
    playerW: string, 
    game: object,
    status: string
}

export class GameManager {
    activeGames: Map<string, string>; // userId -> gameId
    games: Map<string, activeGame>; // gameId -> game

    constructor() {
        this.activeGames = new Map();
        this.games = new Map();
        this.createGame = this.createGame.bind(this);
        this.closeGame = this.closeGame.bind(this);
        this.makeMove = this.makeMove.bind(this);
        this.statusUpdate = this.statusUpdate.bind(this);
        
    } 

    createGame(userIdW: string, userIdB: string): string{
        const gameId = v4();
        const newGame: activeGame = {
            playerW: userIdW,
            playerB: userIdB,
            game: new Chess(),
            status: "active"
        }
    
        this.games.set(gameId, newGame);
        this.activeGames.set(userIdW, gameId);
        this.activeGames.set(userIdB, gameId);
        return gameId;
    }
    closeGame(gameId: string): boolean{
        if (!this.games.has(gameId))
            return false;
        const playerB: string = this.games.get(gameId)!.playerB;
        const playerW: string = this.games.get(gameId)!.playerW;
        this.activeGames.delete(playerB);
        this.activeGames.delete(playerW);
        this.games.delete(gameId);
        return true;
    }
    
    makeMove(gameId: string, move: string): boolean{
        if (!this.games.has(gameId)){
            console.error(`GameManager.move game not found ${gameId}`);
            return false;
        }
        const game: Chess = this.games.get(gameId)!.game as Chess;
        try{
            game.move(move);
            return true;
        } catch (e) {
            return false;
        }
    }

    statusUpdate(gameId: string, status: any): boolean {
        if (!this.games.has(gameId)){
            console.error(`GameManager.statusUpdate game not found ${gameId}`);
            return false;
        }
        const game: Chess = this.games.get(gameId)!.game as Chess;
        if (game.isStalemate()){
            status.status = 'draw';
            status.reason = 'stalemate';
            return true;
        }
        if (game.isThreefoldRepetition()){
            status.status = 'draw';
            status.reason = 'threefold repetition';
            return true;
        }
        if (game.isInsufficientMaterial()){
            status.status = 'draw';
            status.reason = 'insufficient material';
            return true;
        }
        if (game.isCheckmate()){
            status.status = 'checkmate';
            status.winner = game.turn();
            return true;
        }
        return false;
    }
}