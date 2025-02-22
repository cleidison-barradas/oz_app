import logger from "../config/logger";
import { IUsersRepository } from "../repositories/users.repository";

import { HTTP_STATUS_CODE } from "../utils/constants";

import { IUser } from "../interfaces/user.interface";
import { CreateUserDTO } from "../interfaces/user.dto";
import { Result } from "../interfaces/result.interface";
import { GeolocationService } from "../services/geolocation.service";

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private geolocationService: GeolocationService
  ) {}

  async execute(data: CreateUserDTO): Promise<Result<IUser>> {
    try {
      const { name, email } = data;

      const userExists = await this.usersRepository.getUserByEmail(email);

      if (userExists.data) {
        return {
          success: false,
          error: {
            code: HTTP_STATUS_CODE.USER_ALREADY_EXISTS,
            message: "User email already in use",
          },
        };
      }

      if (data?.address) {
        data.coordinates =
          await this.geolocationService.getCoordinatesFromAddress(data.address);
      } else {
        data.address = await this.geolocationService.getAddressFromCoordinates(
          data.coordinates.lat,
          data.coordinates.lng
        );
      }

      const response = await this.usersRepository.createUser(data);

      return response;
    } catch (error) {
      logger.error(error);
      return {
        success: false,
        error: {
          code: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
          message: error.message || "An unexpected error occurred",
        },
      };
    }
  }
}
