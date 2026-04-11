import type { Gender } from "./room";

export type Status = "FREE" | "OCCUPIED" | "OUT_OF_SERVICE";

export type Locker = {
  id: number;
  lockerNumber: string;
  keyNumber: number;
  status: Status;
  roomId: number;
  room_name: string;
  roomGender: Gender;
  gridX: number;
  gridY: number;
};

export type NewLocker = Omit<
  Locker,
  "id" | "room_name" | "roomGender" | "roomId" | "status"
>;
