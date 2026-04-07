import React from "react";
import EditBar from "./EditBar";

const EditView = ({
  setIsEditMode: _setIsEditMode,
}: {
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div>
      <EditBar />
    </div>
  );
};

export default EditView;
