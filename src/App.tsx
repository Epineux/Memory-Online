import { useEffect, useState } from 'react';
import CardsGrid from './components/CardsGrid';
import GameMenu from './components/GameMenu';
import Header from './components/Header';
import { GameContext } from './context/gameContext';
import { Game } from './types';

function App() {
  const [cardsNumber, setCardsNumber] = useState(12);
  const [highScore, setHighScore] = useState(0);

  // THEME LOGIC
  const [isDark, setIsDark] = useState(true);
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const newTheme = !prev ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
      return !prev;
    });
  };


  // GAME LOGIC
  // Define the game state and its updater functions
  const [game, setGame] = useState<Game>({
    hasStarted: false,
    isOver: false,
    resetTrigger: false,
    moves: 0,
    seconds: 0,
    score: 10000
  });

  // Function to start the game
  const startGame = () => {
    setGame({
      ...game,
      hasStarted: true,
    });
  };

  // Function to end the game
  const endGame = () => {
    setGame((prevGame : Game) => ({
      ...prevGame,
      isOver: true,
    }));
  };

  // Function to reset the game
  const resetGame = () => {
    setGame((prevGame) => ({
      ...prevGame,
      hasStarted: false,
      isOver: false,
      score: 10000,
      moves: 0,
      seconds: 0,
      resetTrigger: !prevGame.resetTrigger, // Toggle resetTrigger to trigger re-render
    }));
  };

  // Function to increment the move count
  const incrementMoves = () => {
    setGame((prevGame) => ({
      ...prevGame,
      score: prevGame.score - 100,
      moves: prevGame.moves + 1,
    }));
  };

  const incrementSeconds = () => {
    setGame((prevGame) => ({
      ...prevGame,
      score: prevGame.score -50,
      seconds: prevGame.seconds + 1,
    }));
  };

  const incrementScore = (multiplicator: number) => {
    setGame((prevGame) => ({
      ...prevGame,
      score: prevGame.score + 1000 * multiplicator,
    }));
  };

  // Provide the game state and functions to the context
  const gameContextValue = {
    game,
    startGame,
    endGame,
    incrementMoves,
    incrementSeconds,
    incrementScore,
    resetGame,
  };

  useEffect(() => {
    resetGame();
  }, [cardsNumber]);

  useEffect(() => {
    if (game.score > highScore) {
      setHighScore(game.score);
    }
  }, [game.score, highScore, game.isOver]);

  return (
    <div className={`min-h-screen p-8 transition-colors duration-300 ease-in-out ${
      isDark ? 'bg-slate-800 text-neutral-200' : 'bg-slate-200 text-neutral-800'
    }`}>
      <GameContext.Provider value={gameContextValue}>
      <Header isDark={isDark} toggleTheme={toggleTheme}/>
      <main className='flex flex-col justify-between items-center px-12 mt-16'>
        <CardsGrid cardsNumber={cardsNumber}/>
        <GameMenu cardsNumber={cardsNumber} setCardsNumber={setCardsNumber} highScore={highScore} />
      </main>
      </GameContext.Provider>
    </div>
  )
}

export default App
