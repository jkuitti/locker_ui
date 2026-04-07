import { useParams } from "react-router-dom";
import { useRoomLockers } from "../hooks/queries/useRoomLockers";
import { useRoomById } from "../hooks/queries/useRoomById";
import RoomHeader from "../components/room/RoomHeader";
import NoLockers from "../components/room/NoLockers";
import { useState } from "react";
import EditView from "../components/room/EditView";

const RoomPage = () => {
  const { roomid } = useParams<{ roomid: string }>();
  const [isEditMode, setIsEditMode] = useState(false);
  const { data: lockers, isLoading, error } = useRoomLockers(Number(roomid));
  const {
    data: room,
    isLoading: isRoomLoading,
    error: roomError,
  } = useRoomById(Number(roomid));

  if (isLoading || isRoomLoading) {
    return <div>Loading...</div>;
  }

  if (error || roomError || !lockers || !room) {
    return <div>Error loading lockers</div>;
  }

  return (
    <div className="container mx-auto p-4 flex justify-between flex-col">
      <RoomHeader room={room} lockers={lockers} setIsEditMode={setIsEditMode} />
      {isEditMode ? (
        <EditView setIsEditMode={setIsEditMode} />
      ) : lockers.length === 0 ? (
        <NoLockers />
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {lockers.map((locker) => (
            <div key={locker.id} className="border p-4 rounded">
              <h2 className="text-lg font-bold">Locker {locker.id}</h2>
              <p>
                Status:{" "}
                {locker.status === "OCCUPIED" ? "Occupied" : "Available"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoomPage;
