import PlayerDeck from "./PlayerDeck";
import ComputerDeck from "./ComputerDeck"

function GameScreen({player, computer, round, changeRound, endGame, changeWinner}){
    const winner = () => {
        if(player.board.allSunked) {
            changeWinner('computer');
            setTimeout(() => {
                endGame(3);   
            }, 1000);
        }
        if(computer.board.allSunked) {
            changeWinner('player');
            setTimeout(() => {
                endGame(3);
            }, 1000);
        }
    }

    const triggerChangeRound = () => {
        changeRound();
    }

    return(
        <>
            <div className="player">
                <PlayerDeck player={player} round={round} computer={computer} checkWinner={winner} changeRound={triggerChangeRound} />
            </div>
            <div className="computer">
                <ComputerDeck player={computer} round={round} checkWinner={winner} changeRound={triggerChangeRound} />
            </div>
        </>
    )
}

export default GameScreen