import { useUIStore } from "../../store/uiStore";
import AddNewRoomModal from "./AddNewRoomModal";

const ModalHost = () => {
  const activeModal = useUIStore((state) => state.activeModal);

  if (!activeModal) return null;

  switch (activeModal) {
    case "ADD_ROOM":
      return <AddNewRoomModal />;
    default:
      return null;
  }
};

export default ModalHost;
