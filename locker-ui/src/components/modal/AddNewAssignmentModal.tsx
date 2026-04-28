import { useUIStore } from "../../store/uiStore";
import BaseModal from "./BaseModal";
import useAssignLocker from "../../hooks/mutations/useAssignLocker";
import { useState } from "react";
import { KeyRound } from "lucide-react";

const AddNewAssignmentModal = () => {
  const closeModal = useUIStore((state) => state.closeModal);
  const modalData = useUIStore((state) => state.modalData);
  const locker = modalData?.locker ?? modalData?.listRow;
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
      <div className="flex items-center bg-[#0f172b] self-center py-4 px-12 rounded-xl">
        <div className="flex gap-2">
          <p className="text-lg text-[#90a1b9]"># </p>
          <p className="text-lg text-white">{locker?.lockerNumber}</p>
        </div>

        <KeyRound
          style={{
            color: "#155dfc",
            width: 35,
            height: 35,
            marginLeft: 10,

            padding: 8,
          }}
        />
        <p className="text-white">{locker?.keyNumber}</p>
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
            <label className="text-white font-medium">Etunimi</label>
            <input
              type="text"
              color="#a1a1a1"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="etunimi"
              required
              className="shadow bg-[#121212] border-[#262626] appearance-none border rounded mt-2 w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-white font-medium">Sukunimi</label>
            <input
              type="text"
              color="#a1a1a1"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="sukunimi"
              required
              className="shadow bg-[#121212] border-[#262626] appearance-none border mt-2 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <button
              className="bg-[#121212] hover:bg-[#1c1c1c] text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline mr-2 border border-[#262626] cursor-pointer"
              type="button"
              onClick={closeModal}
            >
              Peruuta
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={
                "text-black font-medium py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline  " +
                (firstName.trim() && lastName.trim() && !isSubmitting
                  ? " bg-white hover:bg-[#d9d9d9] cursor-pointer"
                  : " bg-[#828282] opacity-60 cursor-not-allowed")
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
