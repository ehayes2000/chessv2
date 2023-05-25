export class MatchMaker {
    searchingPlayers: Array<string>;
    createGame: (userIdW: string, userIdB: string) => string;
    constructor(gameMaker: (userIdW: string, userIdB: string) => string){
        this.searchingPlayers = new Array();
        this.createGame = gameMaker;
    }
    findGame(playerId: string){
        if (this.searchingPlayers.length <= 0) {
            this.searchingPlayers.push(playerId);
            return null;
        }
        return this.createGame(playerId, this.searchingPlayers.pop()!);        
    }
}