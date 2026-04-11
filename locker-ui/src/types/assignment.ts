import type { Gender } from "./room";

export type Assignment = {
  id: number;
  assigned_at: string;
  employeeLastName: string;
  employeeFirstName: string;
  locker_number: string;
  key_number: number;
  room_gender: Gender;
};

export type NewAssignment = Omit<
  Assignment,
  "id" | "assigned_at" | "locker_number" | "key_number" | "room_gender"
>;
