import type { Gender } from "./room";

export type Status = "FREE" | "OCCUPIED" | "OUT_OF_SERVICE";

export type Locker = {
  id: number;
  locker_number: number;
  key_number: number;
  status: Status;
  room_id: number;
  room_name: string;
  roomGender: Gender;
  gridX: number;
  gridY: number;
};
