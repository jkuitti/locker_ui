import { Plus, DoorClosed } from "lucide-react";
const NoRooms = () => {
  return (
    <div className="box-border size-70 border-1 border-gray-300 text-center rounded-md flex items-center justify-center self-center w-full flex-col gap-2 bg-white">
      <DoorClosed
        style={{
          color: "gray",
          scale: "2",
          marginBottom: "10px",
        }}
      />
      <h2 className="text-xl font-semibold"> Ei huoneita</h2>
      <p className="text-gray-500">Aloita lisäämällä huone</p>
      <div className="flex items-center justify-center bg-black rounded-md self-center px-4 py-2 cursor-pointer">
        <Plus
          style={{
            color: "white",
          }}
        />
        <p className="text-white mx-1 text-sm">Lisää huone</p>
      </div>
    </div>
  );
};

export default NoRooms;
