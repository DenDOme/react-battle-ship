import PlayerDeck from "./PlayerDeck";
import ComputerDeck from "./ComputerDeck"
import style from '../assets/css/DeckScreen.module.css'

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
            <div className={`${style.deckRow}`}>
                
                <div className="player">
                    <PlayerDeck player={player} round={round} computer={computer} checkWinner={winner} changeRound={triggerChangeRound} />
                </div>
                <div className="computer">
                    <ComputerDeck player={computer} round={round} computer={player} checkWinner={winner} changeRound={triggerChangeRound} />
                </div>
            </div>
        </>
    )
}

export default GameScreen