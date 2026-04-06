import { useQuery } from "@tanstack/react-query";
import { getRooms } from "../../api/roomApi";
import type { Room } from "../../types/room";

export const useRooms = () => {
  return useQuery<Room[]>({
    queryKey: ["rooms"],
    queryFn: getRooms,
  });
};
