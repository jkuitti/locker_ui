import { useQuery } from "@tanstack/react-query";
import { getLockersByRoomId } from "../../api/lockerApi";
import type { Locker } from "../../types/locker";

export const useRoomLockers = (roomId: number) => {
  return useQuery<Locker[]>({
    queryKey: ["lockers", roomId],
    queryFn: () => getLockersByRoomId(roomId),
  });
};
