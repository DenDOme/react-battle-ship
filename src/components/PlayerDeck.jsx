import PlayerCell from "./Cells/PlayerCell";
import Ship from "../scripts/Ship";
import { useEffect, useState } from "react";

function PlayerDeck({player, round, computer, changeRound}){
    const [board, setBoard] = useState([...player.board.map]);
    const [isComputerTurn, setIsComputerTurn] = useState(false);
    const mapWidth = player.board.mapx

    useEffect(() => {
        setBoard([...player.board.map]);
    }, [player.board.map]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (round && !isComputerTurn) {
                setIsComputerTurn(true);
            }
        }, 1000);
        return () => clearTimeout(timeout);
    }, [round, isComputerTurn]);  

    useEffect(() => {
        if (isComputerTurn && round) {
            const res = computer.hitOpponentShip(player);
            setIsComputerTurn(false); 
            
            if (!res) {
                changeRound();
            }
        }
    }, [isComputerTurn, round, player, computer, changeRound]);

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