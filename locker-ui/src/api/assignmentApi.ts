import apiClient from "./client";

const getAssignments = async () => {
  const response = await apiClient.get("/assignments");
  return response.data;
};

const createAssignment = async () => {
  const response = await apiClient.post("/assignments");
  return response.data;
};

export { getAssignments, createAssignment };
