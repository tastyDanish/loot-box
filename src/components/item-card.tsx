import { X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";

type ItemCardProps = {
  onRemove: () => void;
  editItem: (newValue: string) => void;
  item: string;
};

const ItemCard = ({ item, onRemove, editItem }: ItemCardProps) => {
  const [value, setValue] = useState(item);

  useEffect(() => {
    setValue(item);
  }, [item]);

  useEffect(() => {
    editItem(value);
  }, [value]);

  const handleBlur = () => {
    if (value.trim() === "") {
      onRemove();
    }
  };
  return (
    <div className="flex w-full flex-col items-center gap-2">
      <div className="flex justify-between gap-2">
        <Input
          value={value}
          onBlur={handleBlur}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button
          size="icon"
          onClick={() => onRemove()}>
          <X />
        </Button>
      </div>
    </div>
  );
};

export default ItemCard;
