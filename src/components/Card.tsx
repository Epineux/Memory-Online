import type { Card } from "../types";

type CardProps = {
 card: Card
 handleCardClick: (card: Card) => void
}

const Card = ({ card, handleCardClick }: CardProps) => {

  return (
    <div
      className="w-28 aspect-square perspective-1000"
    >
      <div className={`relative w-full h-full duration-500 preserve-3d ease-in-out ${card.isFlipped ? '' : 'rotate-y-180'}`}
      onClick={() => handleCardClick(card)}>
        {/* Frontside */}
        <div className="absolute inset-0 bg-base-100 rounded-xl flex flex-col gap-4 justify-center items-center front face-hidden shadow-[0px_0px_3px_1px_#FCFF5D]">
          <figure>
            <card.icon className='w-10 h-10'/>
          </figure>
          <h2 className="card-title">{card.name}</h2>
        </div>
        {/* Backside */}
        <div className="absolute inset-0 bg-primary rounded-xl flex items-center justify-center transition-shadow back face-hidden rotate-y-180 shadow-[0px_0px_2px_0px_#FCFF5D] hover:cursor-pointer hover:shadow-none">
        </div>
      </div>
    </div>
  );
};

export default Card;
