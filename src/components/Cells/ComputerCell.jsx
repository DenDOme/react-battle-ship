import { useEffect, useState } from "react";

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
            className="dataset-button"
            style={hoverStyle}
            disabled={disabled || disableButton}
            onClick={() => { hitShip(x, y); }}
        >
        </button>
    );
}

export default ComputerCell;
