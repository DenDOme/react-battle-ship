import { useState } from 'react'
import './assets/css/App.css'
import Player from './scripts/player';
import StartScreen from './components/StartScreen';
import DeckScreen from './components/DeckScreen';
import Computer from './scripts/computer';
import GameScreen from './components/GameScreen';
import EndScreen from './components/EndScreen';

function App() {
  const [player, setPlayer] = useState(new Player());
  const [computer, setComputer] = useState(new Computer());
  const [round, setRound] = useState(true);
  const [mode, setMode] = useState(0);
  const [winner, setWinner] = useState(null);

  const handleChangeMode = (state) => {
    setMode(state);
    if(state === 2) handleChangeRound();
  }

  const handleChangeRound = () => {
    setRound(!round);
  }

  const handleChangeWinner = (winner) => {
    setWinner(winner);
  }

  const resetData = () => {
    setPlayer(new Player());
    setComputer(new Computer());
    setRound(true);
    setMode(0);
    setWinner(null);
  }
  
  return (
    <>
    {mode === 0 && <StartScreen startGame={handleChangeMode}/>}
    {mode === 1 && <DeckScreen player={player} startBattle={handleChangeMode}/>}
    {mode === 2 && <GameScreen player={player} computer={computer} round={round} changeRound={handleChangeRound} endGame={handleChangeMode} changeWinner={handleChangeWinner}/>}
    {mode === 3 && <EndScreen player={player} computer={computer} winner={winner} restartGame={resetData}/>}
    </>
  );
}

export default App
