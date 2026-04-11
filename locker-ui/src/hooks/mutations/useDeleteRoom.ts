import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRoom } from "../../api/roomApi";

export const useDeleteRoom = () => {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, number>({
    mutationFn: (roomId: number) => deleteRoom(roomId),
    onSuccess: async () => {
      // Invalidate rooms so lists refresh immediately
      await queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
    onError: (error: any) => {
      alert(error.response?.data?.message);
    },
  });
};

export default useDeleteRoom;
