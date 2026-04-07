import { Plus } from "lucide-react";
import { useUIStore } from "../../store/uiStore";

const AddNewRoom = () => {
  const openModal = useUIStore((state) => state.openModal);

  return (
    <div
      onClick={() => openModal("ADD_ROOM")}
      className="flex items-center justify-center bg-black rounded-md self-center px-4 py-2 cursor-pointer"
    >
      <Plus
        style={{
          color: "white",
        }}
      />
      <p className="text-white mx-1 text-sm">Lisää huone</p>
    </div>
  );
};

export default AddNewRoom;
