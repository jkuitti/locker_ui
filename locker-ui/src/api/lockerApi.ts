import type { NewLocker } from "../types/locker";
import apiClient from "./client";

const getLockersByRoomId = async (roomId: number) => {
  const response = await apiClient.get(`/rooms/${roomId}/lockers`);

  return response.data;
};

const getLockers = async () => {
  const response = await apiClient.get("/lockers");
  return response.data;
};

const createLocker = async (roomId: number, data: NewLocker) => {
  const response = await apiClient.post(`/rooms/${roomId}/lockers`, data);
  return response.data;
};

const deleteLocker = async (lockerId: number) => {
  await apiClient.delete(`/lockers/${lockerId}`);
};

export { getLockers, createLocker, getLockersByRoomId, deleteLocker };
