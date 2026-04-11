import React from "react";
import EditBar from "./EditBar";
import LockerGrid from "./LockerGrid";
import type { Locker } from "../../types/locker";

const EditView = ({
  roomId,
  rows,
  cols,
  setRows,
  setCols,
  lockers,
}: {
  roomId: number;
  rows: number;
  cols: number;
  setRows: React.Dispatch<React.SetStateAction<number>>;
  setCols: React.Dispatch<React.SetStateAction<number>>;
  lockers: Locker[];
}) => {
  return (
    <div className="space-y-6">
      <EditBar rows={rows} cols={cols} setRows={setRows} setCols={setCols} />
      <LockerGrid
        roomId={roomId}
        rows={rows}
        cols={cols}
        lockers={lockers}
        isEditMode
      />
    </div>
  );
};

export default EditView;
