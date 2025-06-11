import { AddItemForm } from "./add-item-form";
import ItemCard from "./item-card";
import { Sidebar, SidebarContent, SidebarHeader } from "./ui/sidebar";

type AppSidebarProps = {
  addItem: (item: string) => void;
  items: string[];
  editItem: (index: number) => (newValue: string) => void;
  removeItem: (index: number) => void;
  title: string;
  setTitle: (newTitle: string) => void;
};

const AppSidebar = ({
  addItem,
  editItem,
  items,
  removeItem,
}: AppSidebarProps) => {
  return (
    <Sidebar
      side="right"
      variant="floating">
      <SidebarHeader />
      <SidebarContent className="flex flex-col gap-4 p-2 pt-0">
        <AddItemForm onAdd={addItem} />
        <div className="scroll-thin flex w-full grow flex-col gap-2 overflow-y-auto">
          {items.map((item, i) => (
            <ItemCard
              key={i}
              item={item}
              editItem={editItem(i)}
              onRemove={() => {
                removeItem(i);
              }}
            />
          ))}
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
