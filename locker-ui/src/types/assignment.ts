import type { Gender } from "./room";

export type Assignment = {
  id: number;
  assignedAt: string;
  employeeLastName: string;
  employeeFirstName: string;
  lockerNumber: string;
  keyNumber: number;
  roomGender: Gender;
};

export type NewAssignment = Omit<
  Assignment,
  "id" | "assignedAt" | "lockerNumber" | "keyNumber" | "roomGender"
>;

export type DeleteAssignment = {
  id: number;
  lockerId: number;
  roomId: number;
};
