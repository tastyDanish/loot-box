import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import confetti from "canvas-confetti";

type ChooseItemProps = {
  close: () => void;
  remove: (index: number) => void;
  items: string[];
};

function randomItem<T>(items: T[]): { item: T; index: number } {
  const index = Math.floor(Math.random() * items.length);
  return { item: items[index], index };
}

export const ItemRoulette = ({ close, remove, items }: ChooseItemProps) => {
  const [animationDone, setAnimationDone] = useState(false);
  const targetIndex = 50;

  const { boxes, winner } = useMemo(() => {
    let winner = -1;

    const boxes = Array.from({ length: 60 }, (_, i) => {
      const winningItem = randomItem(items);
      if (i === targetIndex) {
        winner = winningItem.index;
      }
      return winningItem.item;
    });

    return { boxes, winner };
  }, [items]);

  const boxWidth = 140; // Tailwind w-24 + border
  const gap = 8; // Tailwind gap-2

  const centerOffset =
    (boxWidth + gap) * targetIndex - window.innerWidth / 2 + boxWidth / 2;

  const duration = 4 + Math.random();
  const delay = 0.2 + Math.random() * 0.3;

  return (
    <div className="absolute w-full h-[300px] flex flex-col overflow-x-hidden overflow-y-visible z-30 justify-end">
      <div className="bg-slate-400 w-full flex flex-col absolute h-[180px] mb-[10px]"></div>
      <motion.div
        animate={{ opacity: 0 }}
        transition={{ delay: delay + duration, duration: 0.1 }}
        className="bg-slate-500 w-1 h-11 self-center -mb-10 z-10 mt-2"
      />
      <motion.div
        className="flex gap-2 py-2"
        initial={{ x: window.innerWidth }}
        animate={{ x: -centerOffset }}
        transition={{
          duration,
          ease: [0.2, 0.2, 0, 1],
          delay,
        }}>
        {boxes.map((label, i) => {
          const baseClass =
            "w-[140px] h-24 shrink-0 bg-slate-200  flex items-center justify-center text-xs font-bold shadow text-center rounded shadow-md p-2  overflow-hidden";
          const textClass =
            "break-words overflow-hidden text-ellipsis whitespace-normal";
          return i === targetIndex ? (
            <motion.div
              key={i}
              animate={{ scale: 2 }}
              transition={{ delay: delay + duration + 0.1 }}
              style={{ transformOrigin: "bottom center" }}
              className={cn(baseClass, animationDone ? "z-50" : "z-20")}
              onAnimationComplete={() => {
                confetti({
                  particleCount: 150,
                  spread: 100,
                  origin: { y: 0.5 },
                  scalar: 1.5,
                  ticks: 150,
                });
                setAnimationDone(true);
              }}>
              <p className={textClass}>{label}</p>
            </motion.div>
          ) : (
            <div
              key={i}
              className={baseClass}>
              <p className={textClass}>{label}</p>
            </div>
          );
        })}
      </motion.div>
      <div
        className={cn(
          "self-center z-50 pb-4 flex gap-2",
          !animationDone ? "opacity-0" : "opacity-100"
        )}>
        <Button
          disabled={!animationDone}
          onClick={() => close()}>
          Close
        </Button>
        <Button
          disabled={!animationDone}
          onClick={() => {
            remove(winner);
            close();
          }}>
          Remove
        </Button>
      </div>
      <div className="w-full absolute h-[200px] z-40 clip-circle" />
    </div>
  );
};
