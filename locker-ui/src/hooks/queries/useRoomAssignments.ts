import { useQuery } from "@tanstack/react-query";
import { getRoomAssignments } from "../../api/assignmentApi";
import type { LockerListRow } from "../../types/lockerListRow";

export const useRoomAssignments = (roomId: number) => {
  return useQuery<LockerListRow[]>({
    queryKey: ["assignments", roomId],
    queryFn: () => getRoomAssignments(roomId),
  });
};
