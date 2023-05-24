
export default async function isLegal(src, trgt, game, setBoard){
    const move = game.move({from: src, to: trgt});
    if (!move)
        return false;
    
    setBoard(game.fen);
    return true;
}