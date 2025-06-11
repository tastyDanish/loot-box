import { motion } from "motion/react";
import { Button } from "./ui/button";

type OpenBoxButtonProps = {
  count: number;
  handleClick: () => void;
  open: boolean;
  isEmpty: boolean;
};

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

const OpenBoxButton = ({
  handleClick,
  count,
  open,
  isEmpty,
}: OpenBoxButtonProps) => {
  return (
    <div className="flex h-screen flex-col justify-center">
      <div className="relative mx-auto w-fit">
        <Button
          disabled={isEmpty}
          onClick={() => {
            if (!open) handleClick();
          }}
          variant="ghost"
          className="relative mt-60 h-fit cursor-pointer p-0 hover:bg-transparent focus:ring-0 focus:outline-none active:bg-transparent">
          <img
            src="/shadow.png"
            className="absolute z-0 max-h-100"
            alt="Shadow"
          />

          <motion.div
            className="relative inline-block"
            animate={open ? { rotate: 0 } : getShakeAnimation(count, open)}
            key={count}>
            <img
              src={open ? "/chest-open.png" : "/chest-closed.png"}
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
