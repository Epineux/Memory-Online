import { LucideProps } from "lucide-react";

export const shuffleCards = (cards: { name: string; icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>; }[]) => {
  const shuffledCards = [...cards];
  for (let i = shuffledCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
  }

  return shuffledCards;
}
