import type { Locker } from "../../types/locker";
import { useUIStore } from "../../store/uiStore";
import useDeleteLocker from "../../hooks/mutations/useDeleteLocker";

const LockerGrid = ({
  roomId,
  rows,
  cols,
  lockers,
  isEditMode = false,
}: {
  roomId: number;
  rows: number;
  cols: number;
  lockers: Locker[];
  isEditMode?: boolean;
}) => {
  const openModal = useUIStore((state) => state.openModal);
  const lockerMap = new Map<string, Locker>();

  lockers.forEach((locker) => {
    lockerMap.set(`${locker.gridX}-${locker.gridY}`, locker);
  });

  const deleteLockerMutation = useDeleteLocker();

  const handeleLockerClick = (locker: Locker) => {
    const confirmed = window.confirm(
      `Poistetaanko pukukaappi ${locker.lockerNumber}?`,
    );
    if (confirmed) {
      deleteLockerMutation.mutate(locker.id);
    }
  };

  const cells = Array.from({ length: rows * cols }, (_, index) => {
    const row = Math.floor(index / cols) + 1;
    const col = (index % cols) + 1;
    const key = `${col}-${row}`;
    const locker = lockerMap.get(key);
    const isFree = locker?.status === "FREE";
    const isOccupied = locker?.status === "OCCUPIED";

    const isEmpty = !locker;
    const canAdd = isEditMode && isEmpty;
    const baseClasses =
      "group relative aspect-square flex flex-col items-center justify-center gap-2 rounded-2xl p-4 text-centertransition-colors duration-200";
    const emptyClasses = isEditMode
      ? "border border-dashed border-gray-400 bg-white cursor-pointer hover:bg-slate-50"
      : "border border-gray-200 bg-white";
    const lockerClasses = locker
      ? isFree
        ? "border border-solid border-green-400  text-green-900  bg-green-200 cursor-pointer"
        : isOccupied
          ? "border border-solid border-blue-400 bg-blue-200 text-blue-900 cursor-pointer"
          : "border border-solid border-gray-300 bg-gray-100 text-gray-600"
      : emptyClasses;

    return (
      <div
        key={key}
        onClick={() => {
          if (canAdd) {
            openModal("ADD_LOCKER", { roomId, gridX: col, gridY: row });
          } else if (locker && !isEditMode && locker.status === "FREE") {
            openModal("ASSIGN_LOCKER", { locker: locker });
          } else if (locker && !isEditMode && locker.status === "OCCUPIED") {
            openModal("RETURN_LOCKER");
          }
        }}
        className={`${baseClasses} ${locker ? lockerClasses : emptyClasses}`}
      >
        {locker ? (
          isEditMode ? (
            <>
              <div className="text-sm font-bold group-hover:opacity-0">
                {locker.lockerNumber}
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handeleLockerClick(locker);
                }}
                className="absolute flex items-center justify-center inset-0 opacity-0 group-hover:opacity-100 hover:bg-red-500 rounded-2xl cursor-pointer"
              >
                <p className="text-lg font-bold">X</p>
              </div>
            </>
          ) : (
            <div className="text-sm font-bold">{locker.lockerNumber}</div>
          )
        ) : isEditMode ? (
          <div className="text-3xl text-gray-500">+</div>
        ) : (
          <div className="h-8" />
        )}
      </div>
    );
  });

  return (
    <div
      className="grid gap-1"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {cells}
    </div>
  );
};

export default LockerGrid;
