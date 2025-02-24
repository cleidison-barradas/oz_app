import logger from "../config/logger";
import { Result } from "../interfaces/result.interface";
import { IUsersRepository } from "../repositories/users.repository";
import { HTTP_STATUS_CODE } from "../utils/constants";

export class DeleteUserUseCase {
  constructor(private readonly repository: IUsersRepository) {}

  async execute(id: string): Promise<Result<string>> {
    try {
      const userExists = await this.repository.getUserById(id);

      if (!userExists.data) {
        return {
          success: false,
          error: {
            code: HTTP_STATUS_CODE.USER_NOT_FOUND,
            message: "User not found",
          },
        };
      }

      const response = await this.repository.deleteUser(id);

      return response;
    } catch (error) {
      logger.error(error);
      return error;
    }
  }
}
