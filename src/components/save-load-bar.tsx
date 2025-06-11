import { Folder, Save } from "lucide-react";
import { Button } from "./ui/button";
import type { LootBox } from "@/items/use-items";

type SaveLoadBarProps = {
  box: LootBox;
  setItems: (items: string[]) => void;
};

const SaveLoadBar = ({ box, setItems }: SaveLoadBarProps) => {
  const handleSave = () => {
    const json = JSON.stringify(box, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${box.title}.json`;
    a.click();

    URL.revokeObjectURL(url);
  };

  const handleLoad = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";

    input.onchange = async (event: any) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const text = await file.text();
      try {
        const loadedItems = JSON.parse(text) as LootBox;
        console.log("loaded items: ", loadedItems);
        if (Array.isArray(loadedItems.items)) {
          setItems(loadedItems.items);
        } else {
          alert("Invalid file format.");
        }
      } catch (err) {
        alert("Failed to parse file.");
      }
    };

    input.click();
  };

  return (
    <div className="flex gap-1">
      <Button
        variant="ghost"
        size="icon"
        className="size-7"
        onClick={handleSave}
        title="Save items">
        <Save />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="size-7"
        onClick={handleLoad}
        title="Load items">
        <Folder />
      </Button>
    </div>
  );
};

export default SaveLoadBar;
