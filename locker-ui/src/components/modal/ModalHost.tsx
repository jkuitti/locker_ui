import { useUIStore } from "../../store/uiStore";
import AddNewLockerModal from "./AddNewLockerModal";
import AddNewRoomModal from "./AddNewRoomModal";
import AddNewAssignmentModal from "./AddNewAssignmentModal";
import ReturnLockerModal from "./ReturnLockerModal";

const ModalHost = () => {
  const activeModal = useUIStore((state) => state.activeModal);

  if (!activeModal) return null;

  switch (activeModal) {
    case "ADD_ROOM":
      return <AddNewRoomModal />;
    case "ADD_LOCKER":
      return <AddNewLockerModal />;
    case "ASSIGN_LOCKER":
      return <AddNewAssignmentModal />;
    case "RETURN_LOCKER":
      return <ReturnLockerModal />;
    default:
      return null;
  }
};

export default ModalHost;
