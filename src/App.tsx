import "./App.css";
import { useItems } from "./items/use-items";
import { useEffect, useState } from "react";
import OpenBoxButton from "./components/open-box-button";
import { SidebarProvider } from "./components/ui/sidebar";
import AppSidebar from "./components/app-sidebar";
import EditLootboxButton from "./components/edit-lootbox-button";
import { ItemRoulette } from "./components/item-roulette";
import SaveLoadBar from "./components/save-load-bar";

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
    <div className="flex max-h-screen min-h-screen w-full flex-col items-center gap-2 overflow-hidden bg-slate-300">
      <section className="flex-min-w-screen absolute justify-center pt-6 text-center font-extrabold">
        <h1>{isEmpty ? "Create your Chest!" : "Open your chest!"}</h1>
        <p className="pt-2">
          {isEmpty ? "Add some loot to your chest!" : "And see what you got!"}
        </p>
      </section>

      <div className="absolute flex min-w-screen justify-center">
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
        <div className="relative flex h-full w-full justify-end pt-2 pr-2">
          <SaveLoadBar />
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
