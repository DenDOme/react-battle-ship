import { useEffect, useState } from 'react'
import './assets/css/App.css'
import Player from './scripts/player';
import StartScreen from './components/StartScreen';
import DeckScreen from './components/DeckScreen';
import Computer from './scripts/computer';
import GameScreen from './components/GameScreen';

function App() {
  const [player, setPlayer] = useState(new Player());
  const [computer, setComputer] = useState(new Computer());
  const [mode, setMode] = useState(0);

  const handleChangeMode = (state) => {
    setMode(state);
  }

  return (
    <>
    {mode === 0 && <StartScreen startGame={handleChangeMode}/>}
    {mode === 1 && <DeckScreen player={player} startBattle={handleChangeMode}/>}
    {mode === 2 && <GameScreen player={player} computer={computer} endGame={handleChangeMode}/>}
    </>
  );
}

export default App
