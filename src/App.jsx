import { useEffect, useState } from 'react'
import './assets/css/App.css'
import Player from './scripts/player';
import StartScreen from './components/StartScreen';
import DeckScreen from './components/DeckScreen';

function App() {
  const [player, setPlayer] = useState(new Player());
  const [mode, setMode] = useState(0);

  const handleChangeMode = (state) => {
    setMode(state);
  }

  return (
    <>
    {mode === 0 && <StartScreen startGame={handleChangeMode}/>}
    {mode === 1 && <DeckScreen player={player} startBattle={handleChangeMode}/>}
    </>
  );
}

export default App
