import "./App.css";
import { useItems } from "./items/use-items";
import OpenBoxButton from "./components/open-box-button";
import { SidebarProvider } from "./components/ui/sidebar";
import AppSidebar from "./components/app-sidebar";
import EditLootboxButton from "./components/edit-lootbox-button";
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";

// import SaveLoadBar from "./components/save-load-bar";

function App() {
  const [showText, setShowText] = useState(true);
  const {
    items,
    addItem,
    removeItem,
    editItem,
    isEmpty,
    // setItems,
    title,
    setTitle,
  } = useItems();

  return (
    <div className="flex max-h-screen min-h-screen w-full flex-col items-center gap-2 overflow-hidden bg-linear-to-t from-slate-500 from-0% via-slate-400 via-30% to-blue-200 to-100%">
      {showText && (
        <AnimatePresence mode="popLayout">
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-min-w-screen absolute justify-center pt-6 text-center font-extrabold">
            <h1>{isEmpty ? "Create your Chest!" : "Open your chest!"}</h1>
            <p className="max-w-120 p-5">
              A free lootbox to help you choose something randomly for a true
              sense of pride and accomplishment
            </p>
          </motion.section>
        </AnimatePresence>
      )}

      <div className="fixed right-0 bottom-0 left-0 flex h-screen min-w-screen">
        <OpenBoxButton
          setShowText={setShowText}
          items={items}
          removeItem={removeItem}
        />
      </div>

      <SidebarProvider>
        <div className="relative flex h-full w-full justify-end gap-1 pt-2 pr-2">
          {/* <SaveLoadBar
            box={{ title, items }}
            setItems={setItems}
          /> */}
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
