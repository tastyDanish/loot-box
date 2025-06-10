import { NotificationCircle } from "./notification-circle";
import { SidebarTrigger } from "./ui/sidebar";

type EditLootboxButtonProps = {
  emptyBox: boolean;
};

const EditLootboxButton = ({ emptyBox }: EditLootboxButtonProps) => {
  return (
    <div className="justify-self-start flex relative">
      <SidebarTrigger className="z-30 justify-self-start" />
      <div className="absolute right-0">
        <NotificationCircle visible={emptyBox} />
      </div>
    </div>
  );
};

export default EditLootboxButton;
