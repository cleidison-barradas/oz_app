import { Result } from "../interfaces/result.interface";
import { CreateUserDTO, UpdateUserDTO } from "../interfaces/user.dto";
import { IUser } from "../interfaces/user.interface";

export interface IUsersRepository {
  listUsers(): Promise<Result<IUser[]>>;
  getUserById(id: string): Promise<Result<IUser>>;
  deleteUser(id: string): Promise<Result<string>>;
  getUserByEmail(email: string): Promise<Result<IUser>>;
  createUser(data: Omit<IUser, "_id">): Promise<Result<IUser>>;
  updateUser(id: string, data: UpdateUserDTO): Promise<Result<IUser>>;
}
