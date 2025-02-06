import { useContext, useEffect } from 'react';
import { GameContext } from '../context/gameContext';

const Timer = () => {
  const gameContext = useContext(GameContext);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (gameContext?.game.hasStarted && !gameContext?.game.isOver) {
      intervalId = setInterval(() => {
        gameContext.incrementSeconds();
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [gameContext?.game.hasStarted, gameContext?.game.isOver]);

  const formatTime = (totalSeconds: number = 0) => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <h3 className="flex flex-col gap-2 text-sm text-right my-auto">
      <span className='mr-2'>Time: </span> <span className={`font-bold text-lg ${gameContext?.game.isOver ? 'text-[#FCFF5D]' : ''
      }`}>{formatTime(gameContext?.game.seconds)}</span>
    </h3>
  );
};

export default Timer;
