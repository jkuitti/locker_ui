import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLocker } from "../../api/lockerApi";
import type { Locker, NewLocker } from "../../types/locker";

const useCreateLocker = (roomId: number) => {
  const queryClient = useQueryClient();

  return useMutation<Locker, unknown, NewLocker>({
    mutationFn: (data: NewLocker) => createLocker(roomId, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["lockers", roomId] });
    },
  });
};

export default useCreateLocker;
