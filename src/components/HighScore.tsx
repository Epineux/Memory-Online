import { useContext } from "react";
import { GameContext } from "../context/gameContext";

type HighScoreProps = {
  highScore: number;
}
const HighScore = ({highScore} : HighScoreProps) => {
  const gameContext = useContext( GameContext );

  return (
      <h3 className="flex flex-col gap-2 text-sm my-auto text-right"> HighScore : <span className={`font-bold text-lg ${gameContext?.game.isOver ? 'text-[#FCFF5D]' : ''
      }`}>{highScore}</span></h3>
  )
}

export default HighScore
