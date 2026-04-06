import apiClient from "./client";
import type { Room } from "../types/room";

const getRooms = async (): Promise<Room[]> => {
  const response = await apiClient.get("/rooms");
  return response.data;
};

const createRoom = async () => {
  const response = await apiClient.post("/rooms");
  return response.data;
};

export { getRooms, createRoom };
