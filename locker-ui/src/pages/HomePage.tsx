import { useNavigate } from "react-router-dom";
import { useRooms } from "../hooks/queries/useRooms";
import NoRooms from "../components/home/NoRooms";

const HomePage = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useRooms();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading rooms</div>;
  }

  const handleNavigation = (roomId: number) => {
    navigate(`/rooms/${roomId}`);
  };

  return (
    <div className="container mx-auto p-4 flex justify-between flex-col">
      <h1 className="text-3xl font-bold mb-2">
        Pukuhuoneiden hallinta järjestelmä
      </h1>
      <p className="text-gray-500 mb-7">
        Valitse huone ja hallitse pukukaappeja
      </p>

      {!data || data.length === 0 ? (
        <NoRooms />
      ) : (
        data.map((room) => (
          <div
            key={room.id}
            onClick={() => handleNavigation(room.id)}
            style={{ cursor: "pointer", margin: "8px 0" }}
          >
            {room.name}
          </div>
        ))
      )}
    </div>
  );
};
export default HomePage;
