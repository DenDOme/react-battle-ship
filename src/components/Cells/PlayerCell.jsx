import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import style from '../../assets/css/Cell.module.css'

function PlayerCell({cellState}){
    const [hoverStyle, setHoverStyle] = useState({ backgroundColor: 'none' });

    useEffect(() => {
        if (cellState === 'ship') {
            setHoverStyle({ backgroundColor: 'green' });
        } else if (cellState === 'missed') {
            setHoverStyle({ backgroundColor: 'darkcyan' });
        } else if (cellState === 'blast') {
            setHoverStyle({ backgroundColor: 'darkcyan' });
        } else if (cellState === 'hit') {
            setHoverStyle({ backgroundColor: 'red'})
        } else {
            setHoverStyle({ backgroundColor: 'white' });
        }
    }, [cellState])

    return(
        <div
            className={`${style.datasetCell}`}
            style={hoverStyle}
        >
        </div>
    )
}

PlayerCell.propTypes = {
    cellState: PropTypes.string.isRequired
}

export default PlayerCell