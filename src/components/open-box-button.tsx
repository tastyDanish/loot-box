import { motion } from "motion/react";
import { Button } from "./ui/button";
import { useState } from "react";
import { ItemRoulette, type Winner } from "./item-roulette";
import WinnerPopup from "./item-roulette/winner-popup";

const getShakeAnimation = (count: number, open: boolean) => {
  if (open) return {};
  if (count <= 1) return { rotate: 0, y: 0 };

  let intensity = 2;
  if (count <= 4) intensity = 2;
  else if (count <= 10) intensity = 4;
  else intensity = 8;

  const randomAngles = Array.from(
    { length: 12 },
    () => Math.random() * (intensity * 2) - intensity
  );

  const bounce = Array.from({ length: 12 }, (_, i) =>
    i % 2 == 0 ? Math.random() * -intensity - 2 : 0
  );

  return {
    rotate: [0, ...randomAngles, 0],
    y: [0, ...bounce, 0],
    transition: {
      rotate: {
        delay: 2,
        duration: 0.8,
        repeat: Infinity,
        ease: "easeInOut",
        repeatDelay: 3,
      },
      y: {
        delay: 2,
        duration: 0.8,
        repeat: Infinity,
        ease: "easeInOut",
        repeatDelay: 3,
      },
    },
  };
};

type OpenBoxButtonProps = {
  items: string[];
  removeItem: (index: number) => void;
};

const OpenBoxButton = ({ items, removeItem }: OpenBoxButtonProps) => {
  const [chestOpen, setChestOpen] = useState(false);
  const [showRoulette, setShowRoulette] = useState(false);
  const [winner, setWinner] = useState<Winner | null>();

  const onWinnerClose = () => {
    setWinner(null);
    setChestOpen(false);
    setShowRoulette(false);
  };

  return (
    <div className="flex h-full w-full flex-col justify-end">
      {winner && (
        <div className="absolute top-0 z-50 flex h-8/10 w-full flex-col items-center justify-center">
          <WinnerPopup
            winner={winner}
            removeWinner={() => {
              onWinnerClose();
              removeItem(winner.index);
            }}
            closeDialog={() => {
              onWinnerClose();
            }}
          />
        </div>
      )}
      {showRoulette && (
        <div className="absolute z-10 flex h-full w-full justify-center overflow-hidden">
          <ItemRoulette
            items={items}
            setWinner={setWinner}
          />
        </div>
      )}
      <div className="bottom-0 mx-auto w-fit">
        <div></div>
        <Button
          disabled={items.length < 1}
          onClick={() => {
            if (!chestOpen) {
              setChestOpen(true);
              setShowRoulette(true);
            }
          }}
          variant="ghost"
          className="overlow-hidden relative cursor-pointer p-0 hover:bg-transparent focus:ring-0 focus:outline-none active:bg-transparent">
          <img
            src={chestOpen ? "/shadow-open.png" : "/shadow-closed.png"}
            className="absolute -z-10 max-h-100"
            alt="Shadow"
          />

          <motion.div
            className="relative inline-block"
            animate={
              chestOpen
                ? { rotate: 0 }
                : getShakeAnimation(items.length, chestOpen)
            }
            key={items.length}>
            <img
              src={chestOpen ? "/chest-open-base.png" : "/chest-closed.png"}
              alt="Treasure Chest Base"
              className="absolute z-40 max-h-100"
            />
            <img
              src={chestOpen ? "/chest-open-top.png" : "/chest-closed.png"}
              alt="Treasure Chest"
              className="max-h-100"
            />
          </motion.div>
        </Button>
      </div>
    </div>
  );
};

export default OpenBoxButton;
