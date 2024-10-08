import { useEffect, useState } from "react";
import PropTypes from "prop-types"
import Cell from "./Cell";
import '../assets/css/DeckScreen.css'

function DeckScreen({player, startBattle}){
    const [length, setLength] = useState(1);
    const [vertical, setVertical] = useState(false);
    const [greenHighLight, setGreenHighLight] = useState([]);
    const [greenVertical , setGreenVertical] = useState([]);
    const [aroundHighLight, setAroundHighLight] = useState([]);
    const [greyVertical, setGreyVertical] = useState([]);
    const [error, setError] = useState(false);
    const [errorVertical, setErrorVertical] = useState(false);
    const [placedGreen ,setPlacedGreen] = useState([]);
    const mapWidth = player.board.mapx; 

    const handleChangeType = (type) => {
        setLength(type);
    }

    const handleChangeVertical = () => {
        setVertical(!vertical)
    }

    const handlePlaceShip = (x,y) => {
        if(error || errorVertical){
            return false;
        }
        const res = player.placeShip(length,x,y,vertical);
        if(res){
            if(vertical){
                setPlacedGreen(prevPlacedGreen => [...prevPlacedGreen, ...greenVertical]);
            }
            else{
                setPlacedGreen(prevPlacedGreen => [...prevPlacedGreen, ...greenHighLight]);
            }
        }
    }

    const handleGreenLight = (x, y, mode) => {
        if(mode){
            const greenVertical = [];
            const greenHorizontal = [];
                for(let i = 0 ; i < length ; i++){
                    greenVertical.push([x,y+i]);
                    greenHorizontal.push([x+i,y]);
                    if(y+i >= player.board.mapy || x > player.board.mapx){
                        setErrorVertical(true);
                    }
                    if(x+i >= player.board.mapx || y > player.board.mapy){
                        setError(true);
                    }
                }
            let adjacentVertical = new Set();
            let adjacentHorizontal = new Set();
            for (const [shipX, shipY] of greenHorizontal) {
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
                    if (!greenHorizontal.some(existingCoord => existingCoord[0] === coord[0] && existingCoord[1] === coord[1])) {
                        adjacentHorizontal.add(`${coord[0]},${coord[1]}`); 
                    }
                }
            }
            for (const [shipX, shipY] of greenVertical) {
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
                    if (!greenVertical.some(existingCoord => existingCoord[0] === coord[0] && existingCoord[1] === coord[1])) {
                        adjacentVertical.add(`${coord[0]},${coord[1]}`); 
                    }
                }
            }
            adjacentHorizontal = Array.from(adjacentHorizontal).map(coord => coord.split(',').map(Number));
            adjacentVertical = Array.from(adjacentVertical).map(coord => coord.split(',').map(Number));
            setAroundHighLight(adjacentHorizontal);
            setGreyVertical(adjacentVertical);
            setGreenHighLight(greenHorizontal);
            setGreenVertical(greenVertical);
        }
        if(!mode){
            setGreenHighLight([]);
            setGreenVertical([]);
            setAroundHighLight([]);
            setGreyVertical([]);
            setError(false);
            setErrorVertical(false);
        }
    }

    return (
        <>
            <h1>Deck Screen</h1>
            <div className="deck-grid">
                {player.board.map.map((cell, index) => {
                    const x = index % mapWidth; 
                    const y = Math.floor(index / mapWidth); 

                    return (
                        <Cell 
                            key={index} 
                            x={x} 
                            y={y} 
                            placeShip={handlePlaceShip} 
                            greenLight={vertical ? greenVertical : greenHighLight} 
                            greyLight={vertical ? greyVertical : aroundHighLight} 
                            changeGreenLight={handleGreenLight} 
                            colorError={vertical? errorVertical : error} 
                            vertical={vertical} 
                            changeVertical={handleChangeVertical}
                            placedGreen={placedGreen}
                        />
                    );
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