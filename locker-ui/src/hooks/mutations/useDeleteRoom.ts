import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRoom } from "../../api/roomApi";

export const useDeleteRoom = () => {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, number>({
    mutationFn: (roomId: number) => deleteRoom(roomId),
    onSuccess: () => {
      // Invalidate rooms so lists refresh immediately
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
  });
};

export default useDeleteRoom;
