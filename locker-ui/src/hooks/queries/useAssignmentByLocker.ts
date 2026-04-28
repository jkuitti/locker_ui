import { useQuery } from "@tanstack/react-query";
import { getAssignmentByLockerId } from "../../api/assignmentApi";
import type { Assignment } from "../../types/assignment";

export const useAssignmentByLocker = (lockerId: number) => {
  return useQuery<Assignment>({
    queryKey: ["assignment", lockerId],
    queryFn: () => getAssignmentByLockerId(lockerId),
  });
};
