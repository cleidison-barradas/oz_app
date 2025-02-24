import { Schema, Types } from "mongoose";

export type Position = number[];

export type RegionCoordinates = {
  type: string;
  coordinates: Position[][] | Position[][][];
};

export interface IRegion {
  _id?: Schema.Types.ObjectId;
  name: string;
  user: Types.ObjectId;
  geometry: RegionCoordinates;
}
