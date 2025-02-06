import { useContext } from 'react';
import { GameContext } from '../context/gameContext';
import { useGame } from '../hooks/useGame';
import Card from './Card';

const CardsGrid = ({cardsNumber}: {cardsNumber: number}) => {

  const gameContext = useContext( GameContext );
 const {cards, handleCardClick} = useGame(cardsNumber, gameContext);


  return (
    <ul className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-7 w-full mx-auto">
      {cards.map((card, index) => (
        <Card key={index} card={card} handleCardClick={handleCardClick} />
      ))}
    </ul>
  )
}

export default CardsGrid
