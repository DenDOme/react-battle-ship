import { useEffect, useState } from "react";

function PlayerCell({x, y, cellState}){
    const [hoverStyle, setHoverStyle] = useState({ backgroundColor: 'none' });

    useEffect(() => {
        if (cellState === 'ship') {
            setHoverStyle({ backgroundColor: 'green' });
        } else if (cellState === 'missed') {
            setHoverStyle({ backgroundColor: 'darkcyan' });
        } else if (cellState === 'blast') {
            setHoverStyle({ backgroundColor: 'lightgrey' });
        } else if (cellState === 'hit') {
            setHoverStyle({ backgroundColor: 'red'})
        } else {
            setHoverStyle({ backgroundColor: 'white' });
        }
    }, [cellState])

    return(
        <div
            className="dataset-cell"
            style={hoverStyle}
        >
        </div>
    )
}

export default PlayerCell