import { randomItem } from "@/lib/utils";
import { motion } from "motion/react";
import { useMemo } from "react";

export type Winner = {
  index: number;
  item: string;
};

type ChooseItemProps = {
  setWinner: (winner: Winner) => void;
  items: string[];
};

export const ItemRoulette = ({ items, setWinner }: ChooseItemProps) => {
  const isSmall = window.matchMedia("(max-width: 640px)").matches;
  const isTiny = window.matchMedia("(max-width: 300px)").matches;

  const targetIndex = 50;

  const { boxes, winner } = useMemo(() => {
    let winner: Winner = { index: -1, item: "" };

    const boxes = Array.from({ length: 60 }, (_, i) => {
      const winningItem = randomItem(items);
      if (i === targetIndex) {
        winner = winningItem;
      }
      return winningItem.item;
    });

    return { boxes, winner };
  }, [items]);

  const actualHeight = window.innerHeight - (isTiny ? 20 : 100);

  // height + padding * 2
  const boxHeight = 80 + 8 * 2;
  const gap = 8; // Tailwind gap-2

  const centerOffset = useMemo(
    () =>
      (boxHeight + gap) * targetIndex -
      actualHeight / 2 +
      gap +
      Math.random() * boxHeight +
      1,
    [items]
  );
  const duration = 7 + Math.random() * 3;

  return (
    <motion.div
      initial={{
        clipPath: "polygon(49% 100%, 51% 100%, 51% 100%, 49% 100%)", // tight beam base
        opacity: 0,
      }}
      animate={{
        clipPath: isSmall
          ? "polygon(0% 0%, 100% 0%, 75% 100%, 25% 100%)" // more compact for mobile
          : "polygon(0% 0%, 100% 0%, 70% 100%, 30% 100%)",
        opacity: 1,
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      className="xs:h-[calc(100%-100px)] relative z-20 flex h-[calc(100%-50px)] w-[600px] justify-center overflow-x-visible overflow-y-hidden bg-orange-300/50">
      <div className="absolute h-full w-[350px] bg-amber-300/40 [clip-path:polygon(10%_0%,_90%_0%,_80%_100%,_20%_100%)] sm:w-[400px] sm:[clip-path:polygon(0%_0%,_100%_0%,_80%_100%,_20%_100%)]" />

      <div className="z-10 -mr-10 h-10 w-20 self-center bg-slate-500 [clip-path:polygon(20%_20%,_100%_50%,_20%_80%,_0%_50%)]" />
      <motion.div
        className="flex flex-col gap-2 py-2"
        initial={{ y: actualHeight }}
        animate={{ y: -centerOffset }}
        transition={{
          duration,
          ease: [0.1, 0.1, 0, 1],
        }}
        onAnimationComplete={() => setWinner(winner)}>
        {boxes.map((label, i) => (
          <div
            key={i}
            className="flex h-24 w-48 shrink-0 items-center justify-center overflow-hidden rounded bg-orange-50 p-2 text-center text-xs font-bold shadow sm:w-64">
            <p className="overflow-hidden break-words text-ellipsis whitespace-normal">
              {label}
              {/* {i} */}
            </p>
          </div>
        ))}
      </motion.div>
      <div className="z-10 -ml-10 h-10 w-20 self-center bg-slate-500 [clip-path:polygon(80%_20%,_0%_50%,_80%_80%,_100%_50%)]" />
    </motion.div>
  );
};
