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
  const plusminuContainer =
    "cursor-pointer bg-[#171e32] border-1 border-[#262626] rounded-xl text-white p-2";

  return (
    <div className="p-2 container bg-[#111b38] mx-auto flex flex-col gap-4 border-1 border-[#193cb8] rounded-lg ">
      <div className="flex gap-2 items-center w-fit px-2 py-1 transition-colors text-sm">
        <SquarePen
          style={{
            width: "40px",
            height: "40px",
            color: "#51a2ff",
            background: "#162a63",
            borderRadius: "50%",
            padding: "7px",
          }}
        />
        <div className="flex flex-col">
          <p className="text-xl font-bold text-[#8ec5ff]">Muokkausnäkymä</p>
          <p className="text-sm text-[#51a2ff]  ">
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
          backgroundColor: "#193cb8",
        }}
      />
      <p className="text-sm font-bold ml-2 text-[#8ec5ff]">Huone koko</p>
      <div className="flex gap-4 items-center w-fit px-2 py-1 transition-colors text-sm ">
        <p className="text-[#51a2ff]">Rivejä: </p>
        <div className={plusminuContainer}>
          <Minus
            size={16}
            onClick={() => setRows((prev) => Math.max(prev - 1, 1))}
          />
        </div>
        <p className="text-[#8ec5ff]">{rows}</p>
        <div className={plusminuContainer}>
          <Plus size={16} onClick={() => setRows((prev) => prev + 1)} />
        </div>

        <p className="text-[#51a2ff]">Sarakkeita: </p>
        <div className={plusminuContainer}>
          <Minus
            size={16}
            onClick={() => setCols((prev) => Math.max(prev - 1, 1))}
          />
        </div>
        <p className="text-[#8ec5ff]">{cols}</p>
        <div className={plusminuContainer}>
          <Plus size={16} onClick={() => setCols((prev) => prev + 1)} />
        </div>
      </div>
    </div>
  );
};

export default EditBar;
