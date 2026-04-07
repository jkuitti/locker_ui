import { SeparatorHorizontal, SquarePen, Plus, Minus } from "lucide-react";
import { useState } from "react";

const EditBar = () => {
  const [roomRows, setRoomRows] = useState(3);
  const [roomCols, setRoomCols] = useState(3);

  return (
    <div className="container bg-[#eff6ff] mx-auto flex flex-col gap-4 border-1 border-gray-300 rounded-md ">
      <div className="flex gap-2 items-center w-fit px-2 py-1 transition-colors text-sm">
        <SquarePen
          style={{
            width: "16px",
            height: "16px",
            color: "blue",
          }}
        />
        <div className="flex flex-col">
          <p className="text-xl font-bold text-[#1c398e]">Muokkausnäkymä</p>
          <p className="text-sm text-[#1447e6]  ">
            Valitse tyhjä ruutu lisätäksesi pukukaappi tai valitse poistettava
            pukukaappi. Paina "tallenna" kun olet valmis.
          </p>
        </div>
      </div>
      <SeparatorHorizontal
        style={{
          width: "98%",
          alignSelf: "center",
          height: "1px",
          backgroundColor: "blue",
        }}
      />
      <p className="text-sm font-bold ml-2 text-[#1c398e]">Huone koko</p>
      <div className="flex gap-4 items-center w-fit px-2 py-1 transition-colors text-sm ">
        <p className="text-[#1447e6]">rows: </p>
        <Minus
          size={16}
          className="cursor-pointer bg-gray-200 rounded"
          onClick={() => setRoomRows((prev) => Math.max(prev - 1, 1))}
        />
        <p className="text-[#1c398e]">{roomRows}</p>
        <Plus
          size={16}
          className="cursor-pointer bg-gray-200 rounded"
          onClick={() => setRoomRows((prev) => prev + 1)}
        />
        <p className="text-[#1447e6]">cols: </p>
        <Minus
          size={16}
          className="cursor-pointer bg-gray-200 rounded"
          onClick={() => setRoomCols((prev) => Math.max(prev - 1, 1))}
        />
        <p className="text-[#1c398e]">{roomCols}</p>
        <Plus
          size={16}
          className="cursor-pointer bg-gray-200 rounded"
          onClick={() => setRoomCols((prev) => prev + 1)}
        />
      </div>
    </div>
  );
};

export default EditBar;
