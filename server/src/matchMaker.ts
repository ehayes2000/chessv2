export class MatchMaker {
    searchingPlayers: Array<string>;
    createGame: (userIdW: string, userIdB: string) => string;
    constructor(gameMaker: (userIdW: string, userIdB: string) => string){
        this.searchingPlayers = new Array();
        this.createGame = gameMaker;
        this.findGame = this.findGame.bind(this);
    }
    findGame(playerId: string): string | null{
        if (this.searchingPlayers.length <= 0) {
            this.searchingPlayers.push(playerId);
            return null;
        }
        return this.createGame(playerId, this.searchingPlayers.pop()!);        
    }
}