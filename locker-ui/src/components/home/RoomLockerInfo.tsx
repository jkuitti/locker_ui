import { useRoomLockers } from "../../hooks/queries/useRoomLockers";

const RoomLockerInfo = ({ roomId }: { roomId: number }) => {
  const { data: lockers, isLoading } = useRoomLockers(roomId);
  return (
    <div className="mt-4">
      {isLoading ? (
        <div>Loading lockers...</div>
      ) : lockers && lockers.length > 0 ? (
        <div>
          <p className="mb-10">{lockers.length} pukukaappia</p>
          <div className="flex justify-between mb-2">
            <p>Vapaana</p>
            <p className="text-green-500">
              {lockers.filter((l) => l.status === "FREE").length}{" "}
            </p>
          </div>
          <div className="flex justify-between">
            <p>Varattuna</p>
            <p className="text-blue-500">
              {lockers.filter((l) => l.status === "OCCUPIED").length}{" "}
            </p>
          </div>
          {/* Progress bar: shows proportion of occupied lockers */}
          <div className="mt-2">
            {(() => {
              const total = lockers.length;
              const occupied = lockers.filter(
                (l) => l.status === "OCCUPIED",
              ).length;
              const pct = total > 0 ? Math.round((occupied / total) * 100) : 0;
              return (
                <div>
                  <div
                    className="w-full bg-gray-200 rounded h-2"
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={pct}
                    aria-label={`Occupied ${pct} percent`}
                  >
                    {occupied > 0 && (
                      <div
                        className="bg-blue-600 h-2 rounded"
                        style={{ width: `${pct}%` }}
                      />
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      ) : (
        <div>
          <p className="text-gray-400">Ei kaappeja määriteltynä</p>
        </div>
      )}
    </div>
  );
};

export default RoomLockerInfo;
