import { useUIStore } from "../../store/uiStore";
import BaseModal from "./BaseModal";
import useAssignLocker from "../../hooks/mutations/useAssignLocker";
import { useState } from "react";
import { KeyRound } from "lucide-react";

const AddNewAssignmentModal = () => {
  const closeModal = useUIStore((state) => state.closeModal);
  const modalData = useUIStore((state) => state.modalData);
  const locker = modalData?.locker;
  const mutation = useAssignLocker(locker?.id ?? 0, locker?.roomId ?? 0);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!locker) {
    return null;
  }

  const handleSubmit = () => {
    mutation.mutate(
      {
        employeeLastName: lastName.trim(),
        employeeFirstName: firstName.trim(),
      },
      {
        onSuccess: () => {
          closeModal();
        },
        onSettled: () => setIsSubmitting(false),
      },
    );
  };

  return (
    <BaseModal title="Varaa pukukaappi" onClose={closeModal}>
      <div className="flex items-center">
        <p className="text-lg text-gray-700"># {locker?.lockerNumber}</p>
        <KeyRound
          style={{
            color: "blue",
            scale: "0.8",
            marginLeft: 10,
          }}
        />
        <p className="text-gray-700">{locker?.keyNumber}</p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setIsSubmitting(true);
          handleSubmit();
        }}
      >
        <div className="flex flex-col mt-8 gap-6">
          <div>
            <label>Etunimi</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="etunimi"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex flex-col">
            <label>Sukunimi</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="sukunimi"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <button
              className="bg-white hover:bg-gray-400 font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline mr-2 border border-gray-400 cursor-pointer"
              type="button"
              onClick={closeModal}
            >
              Peruuta
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={
                "text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline brightness-50 " +
                (firstName.trim() && lastName.trim() && !isSubmitting
                  ? " bg-black hover:brightness-100 cursor-pointer"
                  : " bg-gray-700 opacity-60 cursor-not-allowed")
              }
            >
              {isSubmitting ? "Tallennetaan..." : "Tallenna"}
            </button>
          </div>
        </div>
      </form>
    </BaseModal>
  );
};

export default AddNewAssignmentModal;
