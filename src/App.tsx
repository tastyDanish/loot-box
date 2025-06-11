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

  const {
    items,
    addItem,
    removeItem,
    editItem,
    isEmpty,
    setItems,
    title,
    setTitle,
  } = useItems();

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
    <div className="flex max-h-screen min-h-screen w-full flex-col items-center gap-2 overflow-hidden bg-linear-to-t from-slate-500 from-0% via-slate-400 via-30% to-blue-200 to-100%">
      <section className="flex-min-w-screen absolute justify-center pt-6 text-center font-extrabold">
        <h1>{isEmpty ? "Create your Chest!" : "Open your chest!"}</h1>
        <p className="max-w-120 p-5">
          A free lootbox to help you choose something randomly for a true sense
          of pride and accomplishment
        </p>
      </section>

      {showRoulette && (
        <div className="absolute -mt-10 w-full md:mt-10">
          <ItemRoulette
            items={items}
            remove={removeItem}
            close={() => {
              setShowRoulette(false);
            }}
          />
        </div>
      )}

      <div className="absolute bottom-0 flex min-w-screen justify-center pb-10">
        <OpenBoxButton
          open={chestOpen}
          count={items.length}
          isEmpty={isEmpty}
          handleClick={() => setChestOpen(!chestOpen)}
        />
      </div>

      <SidebarProvider>
        <div className="relative flex h-full w-full justify-end gap-1 pt-2 pr-2">
          <SaveLoadBar
            box={{ title, items }}
            setItems={setItems}
          />
          <EditLootboxButton emptyBox={isEmpty} />
        </div>
        <AppSidebar
          title={title}
          setTitle={setTitle}
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
