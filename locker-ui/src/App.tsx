import { Routes, Route } from "react-router-dom";
import RoomPage from "./pages/RoomPage";
import AssignmentsPage from "./pages/AssignmentsPage";
import HomePage from "./pages/HomePage";
import ModalHost from "./components/modal/ModalHost";

const App = () => {
  return (
    <div className="bg-[#0f172b] min-h-screen">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/rooms/:roomid" element={<RoomPage />} />
        <Route path="/assignments" element={<AssignmentsPage />} />
      </Routes>
      <ModalHost />
    </div>
  );
};

export default App;
