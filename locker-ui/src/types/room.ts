export type Gender = "MEN" | "WOMEN";

export type Room = {
  id: number;
  name: string;
  gender: Gender;
  gridRows: number;
  gridCols: number;
};
