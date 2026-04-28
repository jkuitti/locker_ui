import { Plus } from "lucide-react";
import { useUIStore } from "../../store/uiStore";

const AddNewRoom = () => {
  const openModal = useUIStore((state) => state.openModal);

  return (
    <div
      onClick={() => openModal("ADD_ROOM")}
      className="flex items-center justify-center bg-white rounded-md self-center px-4 py-2 cursor-pointer"
    >
      <Plus
        style={{
          color: "#171717",
        }}
      />
      <p className="text-[#171717] mx-1 text-sm">Lisää huone</p>
    </div>
  );
};

export default AddNewRoom;
