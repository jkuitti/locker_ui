import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLocker } from "../../api/lockerApi";

const useDeleteLocker = () => {
  const queryClient = useQueryClient();
  return useMutation<void, unknown, number>({
    mutationFn: (lockerId: number) => deleteLocker(lockerId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["lockers"] });
    },
    onError: (error: any) => {
      alert(error.response?.data?.message);
    },
  });
};

export default useDeleteLocker;
