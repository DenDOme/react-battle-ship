import PlayerCell from "./Cells/PlayerCell";
import PropTypes from "prop-types";
import Ship from "../scripts/ship.js";
import { useEffect, useState } from "react";
import style from '../assets/css/DeckScreen.module.css'

function PlayerDeck({player, round, computer, checkWinner, changeRound}){
    const [board, setBoard] = useState([...player.board.map]);
    const [isComputerTurn, setIsComputerTurn] = useState(false);
    useEffect(() => {
        board;
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
            checkWinner();
        }
    }, [isComputerTurn, round, player, computer, changeRound]);

    return(
        <>
            <div className={`${style.stats}`}>
                <h2 className={`${style.name}`}>Player</h2>
                <p className={`${style.counter}`}>Missed Shots : {computer.board.missedShots}</p>
            </div>
            <div className={`${style.deckGrid}`}>
                {player.board.map.map((cell, index) => {
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
                            cellState={cellState}
                        />
                    );
                })}
            </div>
        </>
    )
}

PlayerDeck.propTypes = {
    round: PropTypes.bool,
    checkWinner: PropTypes.func,
    changeRound: PropTypes.func,
    player: PropTypes.shape({
        board: PropTypes.shape({
            mapx: PropTypes.number.isRequired,        
            mapy: PropTypes.number.isRequired,        
            map: PropTypes.arrayOf(PropTypes.oneOfType([ 
            PropTypes.number,                       
            PropTypes.object,                       
            ])).isRequired,                          
            missedShots: PropTypes.number.isRequired, 
            ships: PropTypes.arrayOf(
            PropTypes.shape({
                length: PropTypes.number.isRequired,
                health: PropTypes.number.isRequired,
                isSunked: PropTypes.bool.isRequired,  
            })
            ).isRequired,
            allSunked: PropTypes.bool.isRequired,  
        }).isRequired,
    }).isRequired,
    computer: PropTypes.shape({
        board: PropTypes.shape({
            mapx: PropTypes.number.isRequired,        
            mapy: PropTypes.number.isRequired,        
            map: PropTypes.arrayOf(PropTypes.oneOfType([ 
            PropTypes.number,                       
            PropTypes.object,                       
            ])).isRequired,                          
            missedShots: PropTypes.number.isRequired, 
            ships: PropTypes.arrayOf(
            PropTypes.shape({
                length: PropTypes.number.isRequired,
                health: PropTypes.number.isRequired,
                isSunked: PropTypes.bool.isRequired,  
            })
            ).isRequired,
            allSunked: PropTypes.bool.isRequired,  
        }).isRequired,
        hitOpponentShip: PropTypes.func,
    })
}

export default PlayerDeck