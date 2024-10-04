import PropTypes from "prop-types"
import Cell from "./Cell";
import '../assets/css/DeckScreen.css'
import { useState } from "react";

function DeckScreen({player, startBattle}){
    const [length, setLength] = useState(1);
    const [vertical, setVertical] = useState(false);
    const [greenHighLight, setGreenHighLight] = useState([]);
    const mapWidth = player.board.mapx; 

    const handleChangeType = (type) => {
        setLength(type);
    }

    const handlePlaceShip = (x,y) => {
        console.log(length,x,y,vertical)
    }

    const handleGreenLight = (x, y, mode) => {
        if(mode){
            const array = [];
            if(vertical){
                for(let i = 0 ; i < length ; i++){
                    array.push([x,y+i]);
                }
            }
            else {
                for(let i = 0 ; i < length ; i++){
                    array.push([x+i,y]);
                }
            }
            setGreenHighLight(array);
        }
        if(!mode){
            setGreenHighLight([]);
        }
    }

    return (
        <>
            <h1>Deck Screen</h1>
            <div className="deck-grid">
                {player.board.map.map((cell, index) => {
                    const x = index % mapWidth; 
                    const y = Math.floor(index / mapWidth); 

                    return <Cell key={index} x={x} y={y} placeShip={handlePlaceShip} greenLight={greenHighLight} changeGreenLight={handleGreenLight}/>;
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