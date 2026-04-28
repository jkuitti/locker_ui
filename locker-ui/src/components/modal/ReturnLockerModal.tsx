import BaseModal from "./BaseModal";
import { useUIStore } from "../../store/uiStore";
import useDeleteAssignment from "../../hooks/mutations/useDeleteAssignment";
import { useAssignmentByLocker } from "../../hooks/queries/useAssignmentByLocker";

const ReturnLockerModal = () => {
  const modalData = useUIStore((state) => state.modalData);
  const closeModal = useUIStore((state) => state.closeModal);
  const mutation = useDeleteAssignment();
  const locker = modalData?.locker ?? modalData?.listRow;
  if (!locker) {
    return null;
  }
  const { data, isLoading, error } = useAssignmentByLocker(locker?.id);

  if (isLoading) {
    return <div>loading...</div>;
  }
  if (error || !data) {
    return <div>error loading assignment</div>;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("fi-FI", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleReturnClick = () => {
    const confirmed = window.confirm(
      `Palautetaanko avain ${locker.keyNumber}?`,
    );
    if (!confirmed) return;
    mutation.mutate(
      {
        id: data.id,
        lockerId: locker.id,
        roomId: locker.roomId,
      },
      {
        onSuccess: () => closeModal(),
      },
    );
  };

  return (
    <BaseModal title="Vapauta pukukaappi" onClose={closeModal}>
      <div className="flex flex-col gap-8 mt-4">
        <div className="flex p-6 bg-white flex-col rounded-xl">
          <p className="font-semibold text-black">Pukukaapin käyttäjä</p>
          <div className="flex gap-2 text-lg text-black mb-5">
            <p>{data?.employeeFirstName}</p>
            <p>{data?.employeeLastName}</p>
          </div>
          <p className="font-semibold">Pukukaapin tiedot</p>
          <div className="flex justify-between">
            <p>Pukukaapin numero:</p>
            <p className="font-bold text-black"> {locker?.lockerNumber}</p>
          </div>

          <div className="flex justify-between">
            <p>Avaimen numero:</p>
            <p className="text-black font-bold">{locker?.keyNumber}</p>
          </div>

          <div className="flex justify-between">
            <p>Luovutettu: </p>
            <p className="text-black font-bold">
              {formatDate(data?.assignedAt ?? "")}
            </p>
          </div>

          <div className="flex flex-col gap-2"></div>
        </div>

        <div className="flex gap-4 mt-10">
          <button
            onClick={closeModal}
            className="p-1 border text-white rounded-lg w-full cursor-pointer bg-[#121212] font-bold border-[#262626] hover:brightness-90"
          >
            Peruuta
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation;
              handleReturnClick();
            }}
            className="text-white rounded-lg w-full cursor-pointer bg-[#521214] font-bold hover:brightness-90"
          >
            Vapauta
          </button>
        </div>
      </div>
    </BaseModal>
  );
};

export default ReturnLockerModal;
