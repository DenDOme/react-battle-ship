import PlayerDeck from "./PlayerDeck";
import ComputerDeck from "./ComputerDeck"

function GameScreen({player, computer, round, changeRound, endGame, changeWinner}){
    const winner = () => {
        if(player.board.allSunked) {
            changeWinner('computer');
            return false
        }
        if(computer.board.allSunked) {
            changeWinner('player');
            return false
        }
        return true;
    }

    const triggerChangeRound = () => {
        changeRound();
    }

    return(
        <>
            <div className="player">
                <PlayerDeck player={player} round={round} computer={computer} changeRound={triggerChangeRound} />
            </div>
            <div className="computer">
                <ComputerDeck player={computer} round={round} changeRound={triggerChangeRound} />
            </div>
        </>
    )
}

export default GameScreen