import "./App.css";
import { useItems } from "./items/use-items";
import { useEffect, useState } from "react";
import OpenBoxButton from "./components/open-box-button";
import { SidebarProvider } from "./components/ui/sidebar";
import AppSidebar from "./components/app-sidebar";
import EditLootboxButton from "./components/edit-lootbox-button";
import { ItemRoulette } from "./components/item-roulette";

function App() {
  const [chestOpen, setChestOpen] = useState(false);
  const [showRoulette, setShowRoulette] = useState(false);

  const { items, addItem, removeItem, editItem, isEmpty } = useItems();

  useEffect(() => {
    if (chestOpen) {
      const timeout = setTimeout(() => {
        setShowRoulette(true);
      }, 200);

      return () => clearTimeout(timeout); // cleanup if unmounted early
    } else {
      setShowRoulette(false);
    }
  }, [chestOpen]);

  useEffect(() => {
    if (!showRoulette) {
      setChestOpen(false);
    }
  }, [showRoulette]);

  return (
    <div className="w-full bg-slate-300 flex flex-col items-center gap-2 max-h-screen min-h-screen overflow-hidden">
      <div className="text-4xl font-extrabold flex-min-w-screen justify-center absolute pt-20 text-center">
        {isEmpty ? "Create your Chest!" : "Open your chest!"}
      </div>
      <div className="flex min-w-screen justify-center absolute">
        {showRoulette && (
          <ItemRoulette
            items={items}
            remove={removeItem}
            close={() => {
              setShowRoulette(false);
            }}
          />
        )}
        <OpenBoxButton
          open={chestOpen}
          count={items.length}
          isEmpty={isEmpty}
          handleClick={() => setChestOpen(!chestOpen)}
        />
      </div>

      <SidebarProvider>
        <div className="w-full flex h-full justify-end relative pt-4 pr-2">
          <EditLootboxButton emptyBox={isEmpty} />
        </div>
        <AppSidebar
          addItem={addItem}
          removeItem={removeItem}
          editItem={editItem}
          items={items}
        />
      </SidebarProvider>
    </div>
  );
}

export default App;
