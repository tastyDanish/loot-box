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

  const boxWidth = 140;
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
    <div className="absolute z-30 flex h-[500px] w-full flex-col justify-center overflow-x-hidden overflow-y-visible">
      <div className="absolute mb-[10px] flex h-[180px] w-full flex-col bg-slate-400" />
      <div className="z-10 mt-2 -mb-10 h-11 w-1 self-center bg-slate-500" />
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

      <div className="clip-circle absolute z-40 h-[200px] w-full" />
      <div className="absolute top-20 z-50 flex w-full justify-center">
        <motion.div
          className="flex h-70 w-96 max-w-screen shrink-0 flex-col items-center justify-center overflow-hidden rounded bg-slate-200 p-2 text-center text-xs font-bold shadow-md"
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
          <div className="flex grow flex-col justify-center">
            <p className="overflow-hidden text-center text-3xl break-words text-ellipsis whitespace-normal">
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
