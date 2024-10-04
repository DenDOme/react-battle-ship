import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../assets/css/Cell.css'

function Cell({x,y,placeShip, greenLight, changeGreenLight}){
    const [hoverStyle, setHoverStyle] = useState({ backgroundColor: 'none' });

    useEffect(() => {
        const isGreen = greenLight.some(coords => coords[0] === x && coords[1] === y);
        
        if (isGreen) {
            setHoverStyle({ backgroundColor: 'green' });
        } else {
            setHoverStyle({ backgroundColor: 'white' });
        }
        
    }, [greenLight, x, y]);

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
    // greenHighLight: PropTypes.arrayOf( 
    //   PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
    // ),
    // onHover: PropTypes.func, 
};

export default Cell