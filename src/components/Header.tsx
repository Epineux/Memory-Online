import { useContext } from "react";
import { GameContext } from "../context/gameContext";
import ThemeController from "./ThemeController";
import Timer from "./Timer";

const Header = ({isDark, toggleTheme}: {isDark: boolean, toggleTheme: () => void}) => {
  const gameContext = useContext( GameContext );
  return (
    <header className='grid grid-cols-3 px-12'>
        <h3 className="flex flex-col gap-2 text-sm my-auto">Cards Returned : <span className={`font-bold text-lg ml-10 ${gameContext?.game.isOver ? 'text-[#FCFF5D]' : ''
      }`}>{gameContext?.game.moves}</span></h3>
        <h1 className='text-4xl text-center relative'>Memory Online
          <ThemeController isDark={isDark} toggleTheme={toggleTheme}/>
        </h1>
        <Timer />
      </header>
  )
}

export default Header
