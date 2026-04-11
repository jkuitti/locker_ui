import BaseModal from "./BaseModal";
import { useUIStore } from "../../store/uiStore";

const ReturnLockerModal = () => {
  const closeModal = useUIStore((state) => state.closeModal);

  return (
    <BaseModal title="Vapauta pukukaappi" onClose={closeModal}>
      <div>
        <p>Vapauta pukukaappi</p>
      </div>
    </BaseModal>
  );
};

export default ReturnLockerModal;
