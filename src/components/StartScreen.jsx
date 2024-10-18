import PropTypes from "prop-types"
import style from '../assets/css/StartScreen.module.css'
import githubSvg from '../assets/imgs/github.svg';

function StartScreen({startGame}){
    return (
        <>
            <div className={`${style.startScreen}`}>
                <h1>Battle Ship</h1>
                <button className="button" onClick={() => {startGame(1)}}>Start Game</button>
            </div>
            <a href="https://github.com/DenDOme/react-battle-ship" className={`${style.githubLink}`}><img src={githubSvg} alt="" /><span>DenDOme</span></a>
        </>
    )
}

StartScreen.propTypes = {
    startGame: PropTypes.func
}

export default StartScreen