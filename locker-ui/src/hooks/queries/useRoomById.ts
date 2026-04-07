import { useQuery } from "@tanstack/react-query";
import { getRoomById } from "../../api/roomApi";
import type { Room } from "../../types/room";

export const useRoomById = (roomId: number) => {
  return useQuery<Room>({
    queryKey: ["room", roomId],
    queryFn: () => getRoomById(roomId),
  });
};
