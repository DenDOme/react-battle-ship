import Cell from "./Cell";
import Ship from "../scripts/Ship";
import '../assets/css/DeckScreen.css'

function Deck({player}){
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
                    } else if (cell === 2) {
                        cellState = "missed";
                    }

                    return (
                        <Cell 
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

export default Deck