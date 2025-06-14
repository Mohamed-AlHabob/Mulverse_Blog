"use client";

import { useEffect, useState } from "react";
import Card from "./card";
import { Card as CardType } from "@/types";
import { preloadImages } from "@/lib/utils";

type CardGridProps = {
  cards: CardType[];
};

const settingsArray = [
  { 
    orientation: 'vertical', 
    slicesTotal: 5 
  },
  { 
    orientation: 'vertical', 
    slicesTotal: 15 
  },
  { 
    orientation: 'horizontal', 
    slicesTotal: 5,
    animation: {
      duration: 0.6,
      ease: 'expo.inOut'
    }
  },
  { 
    orientation: 'horizontal', 
    slicesTotal: 15,
    animation: {
      duration: 0.6,
      ease: 'expo.inOut'
    }
  },
];

export default function CardGrid({ cards }: CardGridProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const imageUrls = cards.map(card => card.image);
    preloadImages(imageUrls).then(() => {
      setLoading(false);
    });
  }, [cards]);

  return (
    <section className={`card-grid grid grid-cols-1 md:grid-cols-3 my-[10vh] border-t border-[rgba(177,177,177,0.3)] ${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
      {cards.map((card, index) => {
        const settingIndex = Math.floor(index / 3) % settingsArray.length;
        const settings = settingsArray[settingIndex];
        
        return (
          <Card 
            key={card.id}
            card={card}
            settings={settings}
            isMiddleColumn={(index % 3) === 1}
          />
        );
      })}
    </section>
  );
}
