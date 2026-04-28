import { useParams } from "react-router-dom";
import { useRoomLockers } from "../hooks/queries/useRoomLockers";
import { useRoomById } from "../hooks/queries/useRoomById";
import RoomHeader from "../components/room/RoomHeader";
import LockerGrid from "../components/room/LockerGrid";
import NoLockers from "../components/room/NoLockers";
import { useEffect, useState } from "react";
import EditView from "../components/room/EditView";
import useUpdateRoomSize from "../hooks/mutations/useUpdateRoomSize";
import LockerList from "../components/room/LockerList";

const RoomPage = () => {
  const { roomid } = useParams<{ roomid: string }>();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isGridView, setIsGridView] = useState(true);
  const { data: lockers, isLoading, error } = useRoomLockers(Number(roomid));
  const {
    data: room,
    isLoading: isRoomLoading,
    error: roomError,
  } = useRoomById(Number(roomid));
  const [editRows, setEditRows] = useState<number>(room?.gridRows ?? 1);
  const [editCols, setEditCols] = useState<number>(room?.gridCols ?? 1);
  const updateSizeMutation = useUpdateRoomSize();

  useEffect(() => {
    if (room) {
      setEditRows(room.gridRows);
      setEditCols(room.gridCols);
    }
  }, [room]);

  if (isLoading || isRoomLoading) {
    return <div>Loading...</div>;
  }

  if (error || roomError || !lockers || !room) {
    return <div>Error loading lockers</div>;
  }

  const handleToggleEditMode = () => {
    if (isEditMode) {
      updateSizeMutation.mutate(
        {
          roomId: room.id,
          data: {
            gridRows: editRows,
            gridCols: editCols,
          },
        },
        {
          onSuccess: () => setIsEditMode(false),
        },
      );
    } else {
      setEditRows(room.gridRows);
      setEditCols(room.gridCols);
      setIsEditMode(true);
    }
  };

  const handleToggleView = () => {
    setIsGridView((prev) => !prev);
  };

  return (
    <div className="container mx-auto p-4 flex justify-between flex-col ">
      <RoomHeader
        room={room}
        lockers={lockers}
        isEditMode={isEditMode}
        isGridView={isGridView}
        onToggleView={handleToggleView}
        onToggleEditMode={handleToggleEditMode}
      />
      {isEditMode ? (
        <EditView
          roomId={room.id}
          rows={editRows}
          cols={editCols}
          setRows={setEditRows}
          setCols={setEditCols}
          lockers={lockers}
        />
      ) : lockers.length === 0 ? (
        <NoLockers />
      ) : isGridView ? (
        <div className="bg-[#1d293d] p-6 rounded-2xl">
          <LockerGrid
            roomId={room.id}
            rows={room.gridRows}
            cols={room.gridCols}
            lockers={lockers}
            isEditMode={false}
          />
        </div>
      ) : (
        <div className="bg-[#1d293d] p-6 rounded-2xl">
          <LockerList roomId={room.id} />
        </div>
      )}
    </div>
  );
};

export default RoomPage;
