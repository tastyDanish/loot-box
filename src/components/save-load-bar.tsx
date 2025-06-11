import { Folder, Save } from "lucide-react";
import { Button } from "./ui/button";

const SaveLoadBar = () => {
  return (
    <div>
      <Button
        variant="ghost"
        size="icon"
        className="size-7">
        <Save />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="size-7">
        <Folder />
      </Button>
    </div>
  );
};

export default SaveLoadBar;
