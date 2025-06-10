import { AnimatePresence, motion } from "motion/react";
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
    <div className="flex flex-col justify-center h-screen">
      <AnimatePresence mode="sync">
        {open && (
          <motion.div
            key="loot-space"
            initial={{ height: 0 }}
            animate={{ height: 200 }}
            exit={{
              height: 0,
              transition: { duration: 0.3, ease: "easeIn" },
            }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      <div className="relative w-fit mx-auto">
        {isEmpty && (
          <div className="absolute text-2xl inset-0 flex items-center justify-center z-20 pointer-events-none text-black text-center font-bold -mt-[60px">
            <div className="relative z-10 p-10  text-gray-700 bg-slate-200 rounded mask-b-from-50% mask-radial-[50%_90%] mask-radial-from-80% mask-t-from-50%">
              Add some loot to your chest!
            </div>
          </div>
        )}

        <Button
          disabled={isEmpty}
          onClick={() => {
            if (!open) handleClick();
          }}
          variant="ghost"
          className="relative h-fit p-0 hover:bg-transparent active:bg-transparent focus:ring-0 focus:outline-none cursor-pointer  md:-mt-[200px]">
          <img
            src="/shadow.png"
            className="max-h-100 absolute z-0"
            alt="Shadow"
          />

          <motion.div
            className="inline-block relative z-10"
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
