import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../assets/css/Cell.css'

function Cell({x,y,placeShip, greenLight, greyLight, changeGreenLight, colorError, vertical, changeVertical, placedGreen}){
    const [hoverStyle, setHoverStyle] = useState({ backgroundColor: 'none' });

    useEffect(() => {
        const isGreen = greenLight.some(coords => coords[0] === x && coords[1] === y);
        const isGrey = greyLight.some(coords => coords[0] === x && coords[1] === y);
        const isPlacedGreen = placedGreen.some(coords => coords[0] === x && coords[1] === y);

        if(isPlacedGreen){
            setHoverStyle({ backgroundColor: 'green' });
        } else if (colorError && isGreen){
            setHoverStyle({ backgroundColor: 'red' });
        } else if (isGrey) {
            setHoverStyle({ backgroundColor: 'lightgrey' });
        } else if(isGreen){
            setHoverStyle({ backgroundColor: 'green' });
        }
        else {
            setHoverStyle({ backgroundColor: 'white' });
        }
        
    }, [greenLight, x, y]);

    useEffect(() => {
        const handleKey = (e) => {
            if(e.key === 'r'){
                changeVertical();
            }
        };

        window.addEventListener('keydown', handleKey);

        return () => {
            window.removeEventListener('keydown', handleKey);
        }
    }, [vertical])

    const handleMouseEnter = () => {
        changeGreenLight(x,y,true);
    };
    
    const handleMouseLeave = () => {
        changeGreenLight(x,y,false);
    };

    return (
        <>
            <button
                className='dataset-button'
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={hoverStyle}
                onClick={() => {placeShip(x,y)}}
            ></button>
        </>
    )
}

Cell.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    placeShip: PropTypes.func.isRequired, 
};

export default Cell