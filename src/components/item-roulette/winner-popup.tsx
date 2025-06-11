import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "../ui/button";
import confetti from "canvas-confetti";
import type { Winner } from ".";

type WinnerPopupProps = {
  winner: Winner;
  removeWinner: () => void;
  closeDialog: () => void;
};
const WinnerPopup = ({
  winner,
  removeWinner,
  closeDialog,
}: WinnerPopupProps) => {
  const [animationDone, setAnimationDone] = useState(false);
  return (
    <motion.div
      className="flex h-70 w-96 max-w-screen shrink-0 flex-col items-center justify-center overflow-hidden rounded bg-orange-50 p-2 text-center text-xs font-bold shadow-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      onAnimationStart={() => {
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.7 },
          scalar: 1.5,
          ticks: 150,
        });
        setAnimationDone(true);
      }}>
      <div className="flex grow flex-col justify-center">
        <p className="overflow-hidden text-center text-3xl break-words text-ellipsis whitespace-normal">
          {winner.item}
        </p>
      </div>

      <div className="z-50 flex gap-2">
        <Button
          disabled={!animationDone}
          onClick={() => closeDialog()}>
          Close
        </Button>
        <Button
          disabled={!animationDone}
          onClick={() => {
            removeWinner();
            closeDialog();
          }}>
          Remove
        </Button>
      </div>
    </motion.div>
  );
};

export default WinnerPopup;
