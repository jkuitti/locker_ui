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

export { getAssignments, createAssignment };
