import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAssignment } from "../../api/assignmentApi";
import type { Assignment, NewAssignment } from "../../types/assignment";

const useAssignLocker = (lockerId: number, roomId: number) => {
  const queryClient = useQueryClient();

  return useMutation<Assignment, unknown, NewAssignment>({
    mutationFn: (data: NewAssignment) => createAssignment(lockerId, data),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["assignments"] }),
        queryClient.invalidateQueries({ queryKey: ["lockers", roomId] }),
      ]);
    },
  });
};

export default useAssignLocker;
