import { Lock } from "lucide-react";

const NoLockers = () => {
  return (
    <div className="box-border size-70 border-1 border-gray-300 text-center rounded-md flex items-center justify-center self-center w-full flex-col gap-2 bg-white">
      <Lock
        style={{
          color: "gray",
          scale: "2",
          marginBottom: "10px",
        }}
      />
      <h2 className="text-xl font-semibold"> Ei pukukaappeja</h2>
      <p className="text-gray-500">
        Aloita painamalla "Muokkaa" nappia lisätäksesi pukukaappeja
      </p>
    </div>
  );
};

export default NoLockers;
