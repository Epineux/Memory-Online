import { useEffect, useState } from "react";
import { cardInfos } from "../assets/cardImages";
import { Card, GameContextType } from "../types";
import { shuffleCards } from "../utils/shuffleCards";

export function useGame(cardsNumber: number, gameContext: GameContextType | undefined) {
  const [cards, setCards] = useState<Card[]>([])
  const [blockClick, setBlockClick] = useState(false)

  useEffect(() => {
    const doubledCardInfos = cardInfos.slice(0, cardsNumber / 2)
      .flatMap((card) => [card, card]);
    const shuffledCards = shuffleCards(doubledCardInfos);
    const newCards = shuffledCards.map((card, index) => ({
      id: index,
      name: card.name,
      icon: card.icon,
      isFlipped: false,
      isMatched: false,
    }));
    setCards(newCards);
  }, [cardsNumber, gameContext?.game.resetTrigger]);

  function handleCardClick(card: Card) {

    if (!gameContext?.game.hasStarted) {
      gameContext?.startGame();
    }

    if(card.isFlipped || card.isMatched || blockClick) {
      return;
    }

    gameContext?.incrementMoves();
    setCards((prevCards) => {
      const newCards = [...prevCards];
      newCards[card.id].isFlipped = true;
      const currentCards = newCards.filter((card) => card.isFlipped && !card.isMatched);
      if (currentCards.length === 2) {
        handleCardMatch([...currentCards]);
      }
      return newCards;
    })
}

function handleCardMatch(currentCards: Card[]) {
  setBlockClick(true);
  const [firstCard, secondCard] = currentCards;
  const isMatched = firstCard.name === secondCard.name;

  setTimeout(() => {
    setCards((prevCards) => {
      const newCards = [...prevCards];
      if (isMatched) {
        newCards[firstCard.id].isMatched = true;
        newCards[secondCard.id].isMatched = true;
        gameContext?.incrementScore(currentCards.length);
        if (newCards.every((card) => card.isMatched)) {
          gameContext?.endGame();
        }
      } else {
        newCards[firstCard.id].isFlipped = false;
        newCards[secondCard.id].isFlipped = false;
      }

      setBlockClick(false);
      return newCards;
    })
  }, 800);

}

return {
  cards,
  handleCardClick,
  handleCardMatch
}

}
