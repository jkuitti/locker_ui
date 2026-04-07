import { Mars, Venus } from "lucide-react";
import type { Room } from "../../types/room";
import { useNavigate } from "react-router-dom";
import RoomLockerInfo from "./RoomLockerInfo";
import { useState } from "react";
import useDeleteRoom from "../../hooks/mutations/useDeleteRoom";

const RoomCard = ({ room }: { room: Room }) => {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteMutation = useDeleteRoom();

  const handleRoomSelection = () => {
    navigate(`/rooms/${room.id}`);
  };

  return (
    <div
      className="group bg-white w-150 rounded-lg shadow-md p-4 flex flex-col cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleRoomSelection}
    >
      <div className="flex justify-between gap-4">
        <h3 className="text-lg font-semibold mb-2">{room.name}</h3>
        {room.gender === "MEN" ? (
          <Mars
            style={{
              color: "gray",
              scale: "1",
            }}
          />
        ) : (
          <Venus
            style={{
              color: "gray",
              scale: "1",
            }}
          />
        )}
      </div>
      <RoomLockerInfo roomId={room.id} />
      <div>
        <p
          className={
            "text-white bg-red-500 text-sm mt-2 rounded py-1 px-2 cursor-pointer hover:bg-red-600 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-150 " +
            (isDeleting ? "opacity-70 cursor-not-allowed" : "")
          }
          onClick={(e) => {
            e.stopPropagation();
            if (isDeleting) return;
            const confirmed = window.confirm(
              `Poistetaanko huone '${room.name}'? Tämä poistaminen on pysyvää.`,
            );
            if (!confirmed) return;
            setIsDeleting(true);
            deleteMutation.mutate(room.id, {
              onSettled: () => setIsDeleting(false),
            });
          }}
        >
          {isDeleting ? "Poistetaan..." : "Poista huone"}
        </p>
      </div>
    </div>
  );
};

export default RoomCard;
