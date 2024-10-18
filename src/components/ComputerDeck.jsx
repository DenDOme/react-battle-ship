import ComputerCell from './Cells/ComputerCell';
import Ship from "../scripts/Ship";
import { useState } from 'react';
import style from '../assets/css/DeckScreen.module.css';

function ComputerDeck({player, round, computer, checkWinner, changeRound}){
    const [board, setBoard] = useState([...player.board.map]);
    const mapWidth = player.board.mapx

    const handleHitShip = (x,y) => {
        const res = player.hitShip(x,y);
        if(!res) {changeRound()};
        checkWinner();

        setBoard([...player.board.map]);
    }

    return(
        <>
            <div className={`${style.stats}`}>
                <h2 className={`${style.name}`}>Computer</h2>
                <p className={`${style.counter}`}>Missed Shots : {computer.board.missedShots}</p>
            </div>
            <div className={`${style.deckGrid}`}>
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
                        <ComputerCell
                            key={index} 
                            x={x} 
                            y={y} 
                            cellState={cellState}
                            hitShip={handleHitShip}
                            disabled={round}
                        />
                    );
                })}
            </div>
        </>
    )
}

export default ComputerDeck