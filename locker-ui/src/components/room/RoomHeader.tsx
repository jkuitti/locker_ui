import { ArrowLeft, SquarePen } from "lucide-react";
import type { Room } from "../../types/room";
import type { Locker } from "../../types/locker";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const RoomHeader = ({
  room,
  lockers,
  setIsEditMode,
}: {
  room: Room;
  lockers: Locker[];
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  type EditButtonState = "muokkaa" | "tallenna";
  const navigate = useNavigate();
  const [editButtonText, setEditButtonText] =
    useState<EditButtonState>("muokkaa");

  const handleEditClick = () => {
    setIsEditMode((prev) => !prev);
    setEditButtonText((prev) => (prev === "muokkaa" ? "tallenna" : "muokkaa"));
  };

  return (
    <div className="container mx-auto flex justify-between">
      <div className="flex gap-6">
        <div
          className="flex items-center gap-2 cursor-pointer mb-4 h-10 w-fit border-1 border-gray-300 rounded-md px-2 py-1 hover:bg-gray-200 transition-colors text-sm"
          onClick={() => navigate("/")}
        >
          <ArrowLeft size={20} />
          <p>Takaisin</p>
        </div>
        <div>
          <h2 className="text-lg font-bold">{room.name}</h2>
          <div>
            <ul className="list-disc list-inside flex gap-1 text-sm text-gray-500 mb-4">
              <li>{lockers.length} pukukaappia</li>
              <li>
                {lockers.filter((l) => l.status === "FREE").length} vapaana
              </li>

              <li>
                {" "}
                {lockers.filter((l) => l.status === "OCCUPIED").length}{" "}
                varattuna{" "}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        onClick={handleEditClick}
        className="flex gap-2 items-center cursor-pointer h-10 w-fit border-1 border-gray-300 rounded-md px-2 py-1 hover:bg-gray-200 transition-colors text-sm"
      >
        <SquarePen
          style={{
            color: "gray",
          }}
        />
        <p className="text-sm">{editButtonText}</p>
      </div>
    </div>
  );
};

export default RoomHeader;
