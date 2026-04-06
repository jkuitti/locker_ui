import { useUIStore } from "../../store/uiStore";
import "../../stylesheets/grid.css";

const LayoutGrid = () => {
  const showGrid = useUIStore((state) => state.showGrid);
  return (
    <div>
      <button onClick={() => useUIStore.getState().toggleGrid()}>edit</button>
      <div className={showGrid ? "room-grid" : ""}></div>
    </div>
  );
};

export default LayoutGrid;
