import PlayerDeck from '../components/PlayerDeck.jsx'
import PropTypes from 'prop-types'
import style from '../assets/css/DeckScreen.module.css'

function EndScreen({player, computer, winner, restartGame}){
    return (
        <>
        <h1 className={`${style.title}`}> Winner = {winner}</h1>
        <div className={`${style.deckRow}`}>
            <div className="player">
                <PlayerDeck player={player} computer={computer} />
            </div>
            <div className="computer">
                <PlayerDeck player={computer} computer={player} />
            </div>
        </div>
        <button className={`${style.button} ${style.endButton} button`} onClick={() => {restartGame()}}>
            restart
        </button>
        </>
    )
}

EndScreen.propTypes = {
    winner: PropTypes.string.isRequired,
    restartGame: PropTypes.func.isRequired,
    player: PropTypes.object.isRequired,
    computer: PropTypes.object.isRequired
}

export default EndScreen