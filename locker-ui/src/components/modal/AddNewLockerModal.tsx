import { useState } from "react";
import useCreateLocker from "../../hooks/mutations/useCreateLocker";
import { useUIStore } from "../../store/uiStore";
import BaseModal from "./BaseModal";

const AddNewLockerModal = () => {
  const [lockerNumber, setLockerNumber] = useState("");
  const [keyNumber, setKeyNumber] = useState("");
  const closeModal = useUIStore((state) => state.closeModal);
  const modalData = useUIStore((state) => state.modalData);
  const roomId = modalData?.roomId ?? 0;
  const mutation = useCreateLocker(roomId);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const gridX = modalData?.gridX ?? 0;
  const gridY = modalData?.gridY ?? 0;

  return (
    <BaseModal title="Lisää uusi kaappi" onClose={closeModal}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setIsSubmitting(true);
          mutation.mutate(
            {
              lockerNumber: lockerNumber.trim(),
              keyNumber: Number(keyNumber.trim()),
              gridX,
              gridY,
            },
            {
              onSuccess: () => {
                closeModal();
              },
              onSettled: () => setIsSubmitting(false),
            },
          );
        }}
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Kaapin numero
          </label>
          <input
            type="text"
            value={lockerNumber}
            onChange={(e) => setLockerNumber(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Kaapin numero"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Avaimen numero
          </label>
          <input
            type="text"
            value={keyNumber}
            onChange={(e) => setKeyNumber(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Avaimen numero"
            required
          />
        </div>
        <div className="flex items-center justify-end">
          <button
            type="button"
            onClick={closeModal}
            className="bg-white hover:bg-gray-400 font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline mr-2 border border-gray-400 cursor-pointer"
          >
            Peruuta
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={
              "text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline brightness-50" +
              (lockerNumber.trim() && keyNumber.trim() && !isSubmitting
                ? " bg-black hover:brightness-100 cursor-pointer "
                : " bg-gray-700 opacity-60 cursor-not-allowed")
            }
          >
            {isSubmitting ? "Tallennetaan..." : "Tallenna"}
          </button>
        </div>
      </form>
    </BaseModal>
  );
};

export default AddNewLockerModal;
