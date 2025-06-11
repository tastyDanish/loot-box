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
  const [animationDone, setAnimationDone] = useState(true);
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
    (boxWidth + gap) * targetIndex -
    window.innerWidth / 2 +
    Math.random() * boxWidth;

  const duration = 5 + Math.random();
  const delay = 0.2 + Math.random() * 0.3;

  const baseClass =
    "w-[140px] h-24 shrink-0 bg-slate-200  flex items-center justify-center text-xs font-bold shadow text-center rounded p-2  overflow-hidden";
  const textClass =
    "break-words overflow-hidden text-ellipsis whitespace-normal";

  return (
    <div className="absolute w-full h-[500px] flex flex-col overflow-x-hidden overflow-y-visible z-30 justify-center">
      <div className="bg-slate-400 w-full flex flex-col absolute h-[180px] mb-[10px]" />
      <motion.div
        // animate={{ opacity: 0 }}
        // transition={{ delay: delay + duration, duration: 0.1 }}
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
        {boxes.map((label, i) => (
          <div
            key={i}
            className={baseClass}>
            <p className={textClass}>{label}</p>
          </div>
        ))}
      </motion.div>

      <div className="w-full absolute h-[200px] z-40 clip-circle" />
      <div className="absolute flex justify-center w-full z-50 top-20">
        <motion.div
          className="w-96 h-70 shrink-0 bg-slate-200 items-center justify-center text-xs font-bold text-center rounded shadow-md p-2  overflow-hidden flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + duration + 0.1 }}
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
          <div className="grow flex flex-col justify-center">
            <p className="break-words overflow-hidden text-ellipsis whitespace-normal text-3xl text-center">
              {items[winner]}
            </p>
          </div>

          <div className="flex gap-2">
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
        </motion.div>
      </div>
    </div>
  );
};
