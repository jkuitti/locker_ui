import apiClient from "./client";

const getLockers = async () => {
  const response = await apiClient.get("/lockers");
  return response.data;
};

const createLocker = async () => {
  const response = await apiClient.post("/lockers");
  return response.data;
};

export { getLockers, createLocker };
