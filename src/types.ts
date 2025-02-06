import { LucideProps } from 'lucide-react';

export type Card = {
    id: number;
    name: string
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    isFlipped: boolean;
    isMatched: boolean;
}

export type Game = {
    hasStarted: boolean;
    isOver: boolean;
    moves: number;
    seconds: number;
    score: number
    resetTrigger: boolean;
  };
export type GameContextType = {
    game: Game;
    startGame: () => void;
    endGame: () => void;
    incrementMoves: () => void;
    incrementSeconds: () => void;
    incrementScore: (multiplicator: number) => void;
    resetGame: () => void;
  };
