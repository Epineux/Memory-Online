import { useContext } from "react";
import { GameContext } from "../context/gameContext";
import CardNumberPicker from "./CardNumberPicker";
import GameOverScreen from "./HighScore";

type CardNumberPickerProps = {
  cardsNumber: number;
  setCardsNumber: React.Dispatch<React.SetStateAction<number>>;
  highScore: number;
}

const GameMenu = ({ cardsNumber, setCardsNumber, highScore }: CardNumberPickerProps) => {
  const gameContext = useContext( GameContext );


  return (
    <div className="grid grid-cols-3 mt-16 w-full">
      <h3 className="flex flex-col gap-2 text-sm my-auto">{gameContext?.game.isOver ? 'Final' : 'Current'} Score : <span className={`font-bold text-lg ${gameContext?.game.isOver ? 'text-[#FCFF5D]' : ''
      }`}>{gameContext?.game.score}</span></h3>
      <CardNumberPicker  value={cardsNumber} onValueChange={setCardsNumber} />
      <GameOverScreen highScore={highScore}  />
      {gameContext?.game.isOver && <button className={"btn btn-primary absolute top-2/3 left-[calc(50%-40px)] "} onClick={() => gameContext?.resetGame()}>Replay</button>}
    </div>
  )
}

export default GameMenu
