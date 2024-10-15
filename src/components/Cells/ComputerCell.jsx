import { useEffect, useState } from "react";

function ComputerCell({ x, y, cellState, hitShip, disabled }) {
    const [hoverStyle, setHoverStyle] = useState({ backgroundColor: 'white' });

    useEffect(() => {
        if (cellState === 'missed') {
            setHoverStyle({ backgroundColor: 'darkcyan' });
        } else if (cellState === 'blast') {
            setHoverStyle({ backgroundColor: 'darkcyan' });
        } else if (cellState === 'hit') {
            setHoverStyle({ backgroundColor: 'red' });
        } else {
            setHoverStyle({ backgroundColor: 'white' });
        }
    }, [cellState]); 

    return (
        <button
            className="dataset-button"
            style={hoverStyle}
            disabled={disabled}
            onClick={() => { hitShip(x, y); }}
        >
        </button>
    );
}

export default ComputerCell;
