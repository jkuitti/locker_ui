import { SeparatorHorizontal, SquarePen, Plus, Minus } from "lucide-react";

const EditBar = ({
  rows,
  cols,
  setRows,
  setCols,
}: {
  rows: number;
  cols: number;
  setRows: React.Dispatch<React.SetStateAction<number>>;
  setCols: React.Dispatch<React.SetStateAction<number>>;
}) => {
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
        <p className="text-[#1447e6]">Rivejä: </p>
        <Minus
          size={16}
          className="cursor-pointer bg-gray-200 rounded"
          onClick={() => setRows((prev) => Math.max(prev - 1, 1))}
        />
        <p className="text-[#1c398e]">{rows}</p>
        <Plus
          size={16}
          className="cursor-pointer bg-gray-200 rounded"
          onClick={() => setRows((prev) => prev + 1)}
        />
        <p className="text-[#1447e6]">Sarakkeita: </p>
        <Minus
          size={16}
          className="cursor-pointer bg-gray-200 rounded"
          onClick={() => setCols((prev) => Math.max(prev - 1, 1))}
        />
        <p className="text-[#1c398e]">{cols}</p>
        <Plus
          size={16}
          className="cursor-pointer bg-gray-200 rounded"
          onClick={() => setCols((prev) => prev + 1)}
        />
      </div>
    </div>
  );
};

export default EditBar;
