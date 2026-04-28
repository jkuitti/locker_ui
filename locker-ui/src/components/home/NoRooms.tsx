import { DoorClosed } from "lucide-react";
import AddNewRoom from "./AddNewRoom";

const NoRooms = () => {
  return (
    <div className="box-border size-70 border-1 border-gray-300 text-center rounded-md flex items-center justify-center self-center w-full flex-col gap-2 bg-[#1d293d]">
      <DoorClosed
        style={{
          color: "#45556c",
          scale: "2",
          marginBottom: "10px",
        }}
      />
      <h2 className="text-xl text-[#cad5e2] font-semibold"> Ei huoneita</h2>
      <p className="text-[#90a1b9]">Aloita lisäämällä huone</p>
      <AddNewRoom />
    </div>
  );
};

export default NoRooms;
