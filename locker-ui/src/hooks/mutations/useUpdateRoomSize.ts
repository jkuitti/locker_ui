import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSize } from "../../api/roomApi";

type UpdateRoomSizeParams = {
  roomId: number;
  data: {
    gridRows: number;
    gridCols: number;
  };
};

export const useUpdateRoomSize = () => {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, UpdateRoomSizeParams>({
    mutationFn: ({ roomId, data }) => updateSize(roomId, data),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["room", variables.roomId], data);
    },
  });
};

export default useUpdateRoomSize;
