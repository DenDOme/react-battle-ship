import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import style from '../../assets/css/Cell.module.css'

function PlaceCell({x, y, placeShip, greenLight, greyLight, changeGreenLight, colorError, vertical, changeVertical, cellState}) {
    const [hoverStyle, setHoverStyle] = useState({ backgroundColor: 'none' });

    useEffect(() => {
        const isGreen = Array.isArray(greenLight) 
            ? greenLight.some(coords => coords[0] === x && coords[1] === y) 
            : null;

        const isGrey = Array.isArray(greyLight) 
            ? greyLight.some(coords => coords[0] === x && coords[1] === y) 
            : null;

        if (cellState === 'ship') {
            setHoverStyle({ backgroundColor: 'green' });
        } 
        else if (colorError && isGreen) {
            setHoverStyle({ backgroundColor: 'red' });
        } 
        else if (isGreen) {
            setHoverStyle({ backgroundColor: 'green' });
        } else if (isGrey) {
            setHoverStyle({ backgroundColor: 'lightgrey' });
        }
        else {
            setHoverStyle({ backgroundColor: 'white' });
        }
    }, [greenLight, cellState]);

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'r') {
                changeVertical();
            }
        };

        window.addEventListener('keydown', handleKey);

        return () => {
            window.removeEventListener('keydown', handleKey);
        }
    }, [vertical]);

    const handleMouseEnter = () => {
        changeGreenLight(x, y, true);
    };

    const handleMouseLeave = () => {
        changeGreenLight(x, y, false);
    };

    return (
        <button
            className={`${style.datasetButton}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={hoverStyle}
            onClick={() => placeShip(x, y)}
        >
        </button>
    );
}

// Cell.propTypes = {
//     x: PropTypes.number.isRequired,
//     y: PropTypes.number.isRequired,
//     placeShip: PropTypes.func.isRequired,
//     greenLight: PropTypes.array.isRequired,
//     greyLight: PropTypes.array.isRequired,
//     changeGreenLight: PropTypes.func.isRequired,
//     colorError: PropTypes.bool.isRequired,
//     vertical: PropTypes.bool.isRequired,
//     changeVertical: PropTypes.func.isRequired,
//     cellState: PropTypes.string.isRequired  
// };

export default PlaceCell;
