import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRoom } from "../../api/roomApi";
import type { Gender, Room } from "../../types/room";

type AddRoomData = {
  name: string;
  gender: Gender;
};

export const useCreateRoom = () => {
  const queryClient = useQueryClient();

  return useMutation<Room, unknown, AddRoomData>({
    mutationFn: (newRoom: AddRoomData) => createRoom(newRoom),
    onSuccess: () => {
      // Invalidate rooms cache so lists refresh
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
  });
};

export default useCreateRoom;
