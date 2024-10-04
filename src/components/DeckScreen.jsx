import PropTypes from "prop-types"
import Cell from "./Cell";
import '../assets/css/DeckScreen.css'
import { useState } from "react";

function DeckScreen({player, startBattle}){
    const [length, setLength] = useState(1);
    const [vertical, setVertical] = useState(false);
    const [greenHighLight, setGreenHighLight] = useState([]);
    const [aroundHighLight, setAroundHighLight] = useState([]);
    const [error, setError] = useState(false);
    const mapWidth = player.board.mapx; 

    const handleChangeType = (type) => {
        setLength(type);
    }

    const handlePlaceShip = (x,y) => {
        console.log(length,x,y,vertical, error);
    }

    const handleGreenLight = (x, y, mode) => {
        if(mode){
            const arrayGreen = [];
            if(vertical){
                for(let i = 0 ; i < length ; i++){
                    arrayGreen.push([x,y+i]);
                    if(y+i >= player.board.mapy || x > player.board.mapx){
                        setError(true);
                    }
                }
            }
            else {
                for(let i = 0 ; i < length ; i++){
                    arrayGreen.push([x+i,y]);
                    if(x+i >= player.board.mapx || y > player.board.mapy){
                        setError(true);
                    }
                }
            }
            const adjacentCells = [];
            for (const [shipX, shipY] of arrayGreen) {
                const surroundingCoords = [
                    [shipX, shipY - 1], // Up
                    [shipX, shipY + 1], // Down
                    [shipX - 1, shipY], // Left
                    [shipX + 1, shipY], // Right
                    [shipX - 1, shipY - 1], // Up - Left
                    [shipX + 1, shipY - 1], // Up - Right
                    [shipX - 1, shipY + 1], // Down - Left
                    [shipX + 1, shipY + 1], // Down - Right
                ];
                for (const coord of surroundingCoords) {
                    if (!arrayGreen.some(existingCoord => existingCoord[0] === coord[0] && existingCoord[1] === coord[1])) {
                        adjacentCells.push([coord[0], coord[1]]); 
                    }
                }
            }
            setAroundHighLight(adjacentCells);
            setGreenHighLight(arrayGreen);
        }
        if(!mode){
            setGreenHighLight([]);
            setAroundHighLight([]);
            setError(false);
        }
    }

    return (
        <>
            <h1>Deck Screen</h1>
            <div className="deck-grid">
                {player.board.map.map((cell, index) => {
                    const x = index % mapWidth; 
                    const y = Math.floor(index / mapWidth); 

                    return <Cell key={index} x={x} y={y} placeShip={handlePlaceShip} greenLight={greenHighLight} greyLight={aroundHighLight} changeGreenLight={handleGreenLight} colorError={error}/>;
                })}
            </div>
            <div className="deck-types">
                <button onClick={() => handleChangeType(1)}>1x</button>
                <button onClick={() => handleChangeType(2)}>2x</button>
                <button onClick={() => handleChangeType(3)}>3x</button>
                <button onClick={() => handleChangeType(4)}>4x</button>
            </div>
            <button onClick={() => startBattle(2)}>Start Battle</button>
        </>
    )
}

DeckScreen.propTypes = {
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
    startBattle: PropTypes.func                               
};

export default DeckScreen