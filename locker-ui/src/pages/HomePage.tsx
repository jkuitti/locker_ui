import { useRooms } from "../hooks/queries/useRooms";
import NoRooms from "../components/home/NoRooms";
import AddNewRoom from "../components/home/AddNewRoom";
import RoomCard from "../components/home/RoomCard";

const HomePage = () => {
  const { data, isLoading, error } = useRooms();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading rooms</div>;
  }

  return (
    <div className="container mx-auto p-4 flex justify-between flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-[#f1f5f9]">
            Pukuhuoneiden hallintajärjestelmä
          </h1>
          <p className="text-[#90a1b9] mb-7">
            Valitse huone ja hallitse pukukaappeja
          </p>
        </div>
        <AddNewRoom />
      </div>
      <div className="flex gap-6">
        {!data || data.length === 0 ? (
          <NoRooms />
        ) : (
          data.map((room) => <RoomCard key={room.id} room={room} />)
        )}
      </div>
    </div>
  );
};
export default HomePage;
