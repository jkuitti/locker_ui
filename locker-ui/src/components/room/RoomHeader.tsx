import { ArrowLeft, SquarePen } from "lucide-react";
import type { Room } from "../../types/room";
import type { Locker } from "../../types/locker";
import { useNavigate } from "react-router-dom";
import { Grid3X3, List } from "lucide-react";

const RoomHeader = ({
  room,
  lockers,
  isEditMode,
  isGridView,
  onToggleView,
  onToggleEditMode,
}: {
  room: Room;
  lockers: Locker[];
  isEditMode: boolean;
  isGridView: boolean;
  onToggleEditMode: () => void;
  onToggleView: () => void;
}) => {
  const navigate = useNavigate();
  const editButtonText = isEditMode ? "tallenna" : "muokkaa";

  const listBall = "rounded-4xl w-5 h-5";
  const listText = "text-[#90a1b9] text-lg font-medium";

  const handleEditClick = () => {
    onToggleEditMode();
  };

  const handleToggleViewClick = () => {
    onToggleView();
  };

  return (
    <div className="container mx-auto flex justify-between">
      <div className="flex gap-6">
        <div
          className="flex items-center gap-2. bg-[#151b29] cursor-pointer mb-4 h-10 w-fit border-1 border-[#262626] rounded-lg px-2 py-1 hover:bg-[#1b2232] transition-colors text-sm"
          onClick={() => navigate("/")}
        >
          <ArrowLeft size={20} color="white" />
          <p className="text-white">Takaisin</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">{room.name}</h2>
          <div className="flex gap-3 justify-center items-center py-4">
            <div className={`${listBall} bg-[#90a1b9]`}></div>
            <p className={listText}>{lockers.length} pukukaappia</p>
            <div className={`${listBall} bg-[#00a63e]`}></div>
            <p className={listText}>
              {lockers.filter((l) => l.status === "FREE").length} vapaana
            </p>
            <div className={`${listBall} bg-[#155dfc]`}></div>
            <p className={listText}>
              {lockers.filter((l) => l.status === "OCCUPIED").length} varattuna
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        {!isEditMode && (
          <div className="flex gap-2 bg-[#1d293d] items-center h-fit w-fit border-1 rounded-lg px-2 py-1 border-[#314158]">
            <div
              onClick={handleToggleViewClick}
              className={`flex gap-2 rounded-lg px-1 py-1 cursor-pointer ${isGridView ? "bg-white text-black" : "text-white"}`}
            >
              <Grid3X3
                className={`h-5 w-5 self-center ${isGridView} ? "text-black" : "text-white"`}
              />
              <p>Kartta</p>
            </div>
            <div
              onClick={handleToggleViewClick}
              className={`flex gap-2 rounded-lg px-1 py-1 cursor-pointer ${!isGridView ? "bg-white text-black" : "text-white"}`}
            >
              <List className="h-5 w-5 self-center" />
              <p>Lista</p>
            </div>
          </div>
        )}
        {isGridView && (
          <div
            onClick={handleEditClick}
            className="flex gap-2 items-center bg-[#161c29] cursor-pointer h-10 w-fit border-1 border-[#262626] rounded-md px-2 py-1 hover:bg-[#1b2232] transition-colors text-sm"
          >
            <SquarePen
              style={{
                color: "white",
              }}
            />
            <p className="text-sm text-white">{editButtonText}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomHeader;
