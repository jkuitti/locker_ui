import { Lock } from "lucide-react";

const NoLockers = () => {
  return (
    <div className="box-border size-70 border-1 border-gray-300 text-center rounded-md flex items-center justify-center self-center w-full flex-col gap-2 bg-[#1d293d]">
      <Lock
        style={{
          color: "#45556c",
          scale: "2",
          marginBottom: "10px",
        }}
      />
      <h2 className="text-xl font-semibold text-[#cad5e2]"> Ei pukukaappeja</h2>
      <p className="text-[#90a1b9] text-lg">
        Aloita painamalla "Muokkaa" nappia lisätäksesi pukukaappeja
      </p>
    </div>
  );
};

export default NoLockers;
