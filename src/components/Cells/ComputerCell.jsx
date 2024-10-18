import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import style from '../../assets/css/Cell.module.css'

function ComputerCell({ x, y, cellState, hitShip, disabled }) {
    const [hoverStyle, setHoverStyle] = useState({ backgroundColor: 'white' });
    const [disableButton, setDisableButton] = useState(false);

    useEffect(() => {
        if (cellState === 'missed') {
            setHoverStyle({ backgroundColor: 'darkcyan' });
            setDisableButton(true);
        } else if (cellState === 'blast') {
            setHoverStyle({ backgroundColor: 'darkcyan' });
            setDisableButton(true);
        } else if (cellState === 'hit') {
            setHoverStyle({ backgroundColor: 'red' });
            setDisableButton(true);
        } else {
            setHoverStyle({ backgroundColor: 'white' });
        }
    }, [cellState]); 

    return (
        <button
            className={`${style.datasetButton}`}
            style={hoverStyle}
            disabled={disabled || disableButton}
            onClick={() => { hitShip(x, y); }}
        >
        </button>
    );
}

ComputerCell.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    cellState: PropTypes.string.isRequired,
    hitShip: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired
}

export default ComputerCell;
