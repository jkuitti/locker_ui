import type { NewAssignment } from "../types/assignment";
import apiClient from "./client";

const getAssignments = async () => {
  const response = await apiClient.get("/assignments");
  return response.data;
};

const createAssignment = async (lockerId: number, data: NewAssignment) => {
  const response = await apiClient.post(
    `/lockers/${lockerId}/assignment`,
    data,
  );

  return response.data;
};

const getAssignmentByLockerId = async (lockerId: number) => {
  const response = await apiClient.get(`/lockers/${lockerId}/assignment`);

  return response.data;
};

const deleteAssignment = async (assignmentId: number, lockerId: number) => {
  await apiClient.delete(`/assignments/${assignmentId}`, {
    data: { lockerId: lockerId },
  });
};

const getRoomAssignments = async (roomId: number) => {
  const response = await apiClient.get(`/rooms/${roomId}/assignments`);
  return response.data;
};

export {
  getAssignments,
  createAssignment,
  deleteAssignment,
  getAssignmentByLockerId,
  getRoomAssignments,
};
