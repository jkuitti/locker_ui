import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAssignment } from "../../api/assignmentApi";
import type { DeleteAssignment } from "../../types/assignment";

const useDeleteAssignment = () => {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, DeleteAssignment>({
    mutationFn: ({ id, lockerId }) => deleteAssignment(id, lockerId),
    onSuccess: async (_data, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["assignments"] }),
        queryClient.invalidateQueries({
          queryKey: ["lockers", variables.roomId],
        }),
      ]);
    },
  });
};

export default useDeleteAssignment;
