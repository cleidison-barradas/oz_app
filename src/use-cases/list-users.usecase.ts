import logger from "../config/logger";
import { Result } from "../interfaces/result.interface";
import { IUser } from "../interfaces/user.interface";
import { IUsersRepository } from "../repositories/users.repository";

export class ListUsersUseCase {
  constructor(private respository: IUsersRepository) {}

  async execute(): Promise<Result<IUser[]>> {
    try {
      const response = await this.respository.listUsers();

      return response;
    } catch (error) {
      logger.error(error);
      return error;
    }
  }
}
