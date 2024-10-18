import { useState } from "react";
import PropTypes from "prop-types"
import PlaceCell from "./Cells/PlaceCell";
import Ship from "../scripts/Ship";
import style from '../assets/css/DeckScreen.module.css'

function DeckScreen({player, startBattle}){
    const [length, setLength] = useState(1);
    const [vertical, setVertical] = useState(false);
    const [greenHorizontal, setGreenHorizontal] = useState([]);
    const [greenVertical , setGreenVertical] = useState([]);
    const [greyHorizontal, setGreyHorizontal] = useState([]);
    const [greyVertical, setGreyVertical] = useState([]);
    const [errorHorizontal, setErrorHorizontal] = useState(false);
    const [errorVertical, setErrorVertical] = useState(false);
    const [placedGreen ,setPlacedGreen] = useState([]);
    const [button, setButton] = useState(true);
    const [shipAmount, setShipAmount] = useState(new Map([
        [1, 4],
        [2, 3],
        [3, 2],
        [4, 1],
    ]));
    const mapWidth = player.board.mapx; 

    const handleChangeType = (type) => {
        setLength(type);
    }

    const handleChangeVertical = () => {
        setVertical(!vertical)
    }

    const handlePlaceShip = (x,y) => {
        if((errorHorizontal && !vertical)|| (errorVertical && vertical)){
            return false;
        }
        const res = player.placeShip(length,x,y,vertical);
        if(res){
            setShipAmount((prevHash) => {
                const newHash = new Map(prevHash);
                const currentHash = newHash.get(length) || 0;
                if(currentHash > 0){
                    newHash.set(length, currentHash - 1);
                }
                return newHash
            })

            if(vertical){
                setPlacedGreen(prevPlacedGreen => [...prevPlacedGreen, ...greenVertical]);
            }
            else{
                setPlacedGreen(prevPlacedGreen => [...prevPlacedGreen, ...greenHorizontal]);
            }
        }
        if(player.board.ships.length === 10){
            setButton(false);
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
                        setErrorHorizontal(true);
                    }
                }
            const adjacentHorizontal = checkAdjacent(greenHorizontal);
            const adjacentVertical = checkAdjacent(greenVertical);                
            if(vertical){
                for(const coords of adjacentVertical){
                    if(placedGreen.some(existingCoord => existingCoord[0] === coords[0] && existingCoord[1] === coords[1])){
                        setErrorVertical(true);
                    }
                }
                for(const coords of greenVertical){
                    if(placedGreen.some(existingCoord => existingCoord[0] === coords[0] && existingCoord[1] === coords[1])){
                        setErrorVertical(true);
                    }
                }
            }
            else {
                for(const coords of adjacentHorizontal){
                    if(placedGreen.some(existingCoord => existingCoord[0] === coords[0] && existingCoord[1] === coords[1])){
                        setErrorHorizontal(true);
                    }
                }
                for(const coords of greenHorizontal){
                    if(placedGreen.some(existingCoord => existingCoord[0] === coords[0] && existingCoord[1] === coords[1])){
                        setErrorHorizontal(true);
                    }
                }
            }
            setGreyHorizontal(adjacentHorizontal);
            setGreyVertical(adjacentVertical);
            setGreenHorizontal(greenHorizontal);
            setGreenVertical(greenVertical);
        }
        if(!mode){
            setGreenHorizontal([]);
            setGreenVertical([]);
            setGreyHorizontal([]);
            setGreyVertical([]);
            setErrorHorizontal(false);
            setErrorVertical(false);
        }
    }

    const checkAdjacent = (coordinates) => {
        const adjacentSet = new Set();
        for (const [shipX, shipY] of coordinates) {
          const surroundingCoords = [
            [shipX, shipY - 1], [shipX, shipY + 1], // Up/Down
            [shipX - 1, shipY], [shipX + 1, shipY], // Left/Right
            [shipX - 1, shipY - 1], [shipX + 1, shipY - 1], // Diagonals
            [shipX - 1, shipY + 1], [shipX + 1, shipY + 1],
          ];
          for (const coord of surroundingCoords) {
            adjacentSet.add(`${coord[0]},${coord[1]}`);
          }
        }
        return Array.from(adjacentSet).map(coord => coord.split(',').map(Number));
    }

    return (
        <>
            <div className={`${style.deckRow}`}>
                <div className={`${style.deckGrid}`}>
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
                            <PlaceCell
                                key={index} 
                                x={x} 
                                y={y} 
                                placeShip={handlePlaceShip} 
                                cellState={cellState}
                                changeGreenLight={handleGreenLight} 
                                greenLight={vertical ? greenVertical : greenHorizontal} 
                                greyLight={vertical ? greyVertical : greyHorizontal} 
                                colorError={vertical? errorVertical : errorHorizontal} 
                                vertical={vertical} 
                                changeVertical={handleChangeVertical}
                                placedGreen={placedGreen}
                            />
                        );
                    })}
                </div>
                <div className={`${style.rightPannel}`}>
                    <div className={`${style.deckTypes}`}>
                        <h2 className={`${style.deckTitle}`}>Ships Available</h2>
                        <div className={`${style.typesColm}`}>
                            <div className={`${style.types}`}>
                                <button onClick={() => handleChangeType(4)} className={`${style.typeBlocks}`}>
                                    <div className={`${style.block}`}></div>
                                    <div className={`${style.block}`}></div>
                                    <div className={`${style.block}`}></div>
                                    <div className={`${style.block}`}></div>
                                </button>
                                <p className={`${style.typeNumber}`}>x{shipAmount.get(4)} </p>
                            </div>
                            <div className={`${style.types}`}>
                                <button onClick={() => handleChangeType(3)} className={`${style.typeBlocks}`}>
                                    <div className={`${style.block}`}></div>
                                    <div className={`${style.block}`}></div>
                                    <div className={`${style.block}`}></div>
                                </button>
                                <p className={`${style.typeNumber}`}>x{shipAmount.get(3)} </p>
                            </div>
                            <div className={`${style.types}`}>
                                <button onClick={() => handleChangeType(2)} className={`${style.typeBlocks}`}>
                                    <div className={`${style.block}`}></div>
                                    <div className={`${style.block}`}></div>
                                </button>
                                <p className={`${style.typeNumber}`}>x{shipAmount.get(2)} </p>
                            </div>
                            <div className={`${style.types}`}>
                                <button onClick={() => handleChangeType(1)} className={`${style.typeBlocks}`}>
                                    <div className={`${style.block}`}></div>
                                </button>
                                <p className={`${style.typeNumber}`}>x{shipAmount.get(1)} </p>
                            </div>
                        </div>
                        <button 
                            disabled={button}
                            onClick={() => startBattle(2)}
                            className={`${style.button} button`}
                        >Ready</button>
                    </div>
                </div>
            </div>
            <p className={`${style.tip}`}>Tip : Press "R" to rotate ships</p>
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