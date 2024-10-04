import PropTypes from "prop-types"

function StartScreen({startGame}){
    return (
        <>
            <h1>Start Screen</h1>
            <button onClick={() => {startGame(1)}}>Start Game</button>
        </>
    )
}

StartScreen.propTypes = {
    startGame: PropTypes.func
}

export default StartScreen