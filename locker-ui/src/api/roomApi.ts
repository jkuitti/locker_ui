import apiClient from "./client";
import type { Room } from "../types/room";

const getRooms = async (): Promise<Room[]> => {
  const response = await apiClient.get("/rooms");
  return response.data;
};

const createRoom = async (data: Omit<Room, "id" | "gridRows" | "gridCols">) => {
  const response = await apiClient.post("/rooms", data);
  return response.data;
};

const deleteRoom = async (roomId: number) => {
  await apiClient.delete(`/rooms/${roomId}`);
};

const getRoomById = async (roomId: number): Promise<Room> => {
  const response = await apiClient.get(`/rooms/${roomId}`);
  return response.data;
};

const updateSize = async (
  roomId: number,
  data: { gridRows: number; gridCols: number },
) => {
  const response = await apiClient.put(`/rooms/${roomId}`, data);
  return response.data;
};

export { getRooms, createRoom, deleteRoom, getRoomById, updateSize };
