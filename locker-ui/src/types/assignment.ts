import type { Gender } from "./room";

export type Assignment = {
  id: number;
  assigned_at: string;
  employee_last_name: string;
  employee_first_name: string;
  locker_number: number;
  key_number: number;
  room_gender: Gender;
};
