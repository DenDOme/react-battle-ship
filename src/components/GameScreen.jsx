import PlayerDeck from "./PlayerDeck";
import ComputerDeck from "./ComputerDeck"

function GameScreen({player, computer, endGame}){


    return(
        <>
            <div className="player">
                <PlayerDeck player={player} />
            </div>
            <div className="computer">
                <ComputerDeck player={computer} />
            </div>
        </>
    )
}

export default GameScreen