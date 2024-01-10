import { IPosition } from "./position.interface";

export interface IExperience {
  company?: string;
  location?: string;
  id: number;
  positions: IPosition[];
}
