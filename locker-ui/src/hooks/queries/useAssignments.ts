import { useQuery } from "@tanstack/react-query";
import { getAssignments } from "../../api/assignmentApi";
import type { Assignment } from "../../types/assignment";

export const useAssignments = () => {
  return useQuery<Assignment[]>({
    queryKey: ["assignments"],
    queryFn: getAssignments,
  });
};
