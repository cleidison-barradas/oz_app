import { Types } from "mongoose";
import { Result } from "../../interfaces/result.interface";
import { UpdateUserDTO } from "../../interfaces/user.dto";
import { IUser } from "../../interfaces/user.interface";
import { IUsersRepository } from "../users.repository";

export class InMemoryUsersRepository implements IUsersRepository {
  private users: IUser[] = [];
  async listUsers(): Promise<Result<IUser[]>> {
    return {
      success: true,
      data: this.users,
    };
  }
  async getUserById(id: string): Promise<Result<IUser>> {
    const user = this.users.find((user) => user._id === (id as any));

    return {
      success: true,
      data: user,
    };
  }
  async deleteUser(id: string): Promise<Result<string>> {
    const index = this.users.findIndex((user) => user._id === (id as any));

    this.users.splice(index, 1);

    return {
      success: true,
      data: id,
    };
  }
  async getUserByEmail(email: string): Promise<Result<IUser>> {
    const user = this.users.find((user) => user.email === email);

    return {
      success: true,
      data: user,
    };
  }
  async createUser(data: Omit<IUser, "_id">): Promise<Result<IUser>> {
    this.users.push({
      _id: String(new Types.ObjectId()) as any,
      ...data,
    });

    return {
      success: true,
      data: this.users[this.users.length - 1],
    };
  }
  async updateUser(id: string, data: UpdateUserDTO): Promise<Result<IUser>> {
    const index = this.users.findIndex((user) => user._id === (id as any));

    this.users[index] = {
      ...this.users[index],
      ...data,
    };

    return {
      success: true,
      data: this.users[index],
    };
  }
}
