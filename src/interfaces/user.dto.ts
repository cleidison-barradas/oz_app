import { AddressCoordinates } from "./user.interface";

export interface CreateUserDTO {
  name: string;
  email: string;
  address?: string;
  coordinates?: AddressCoordinates;
}

export interface UpdateUserDTO {
  name?: string;
  address?: string;
  coordinates?: AddressCoordinates;
}
