import { Schema } from "mongoose";

export type AddressCoordinates = {
  lat: number;
  lng: number;
};

export interface IUser {
  _id: Schema.Types.ObjectId;
  name: string;
  email: string;
  address?: string;
  coordinates?: AddressCoordinates;
}
