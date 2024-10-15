import PlayerCell from "./Cells/PlayerCell";
import Ship from "../scripts/Ship";

function PlayerDeck({player}){
    const mapWidth = player.board.mapx

    return(
        <>
            <div className="deck-grid">
                {player.board.map.map((cell, index) => {
                    const x = index % mapWidth; 
                    const y = Math.floor(index / mapWidth); 
                    let cellState = "";
                    if (cell === 0) {
                        cellState = "empty";
                    } else if (cell instanceof Ship) {
                        cellState = "ship";
                    } else if (cell === 1){
                        cellState = 'blast'
                    } else if (cell === 2) {
                        cellState = "missed";
                    } else if (cell === 3) {
                        cellState = "hit"
                    }

                    return (
                        <PlayerCell
                            key={index} 
                            x={x} 
                            y={y} 
                            cellState={cellState}
                        />
                    );
                })}
            </div>
        </>
    )
}

export default PlayerDeck