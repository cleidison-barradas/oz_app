import logger from "../config/logger";
import { IUsersRepository } from "../repositories/users.repository";
import { GeolocationService } from "../services/geolocation.service";

import { HTTP_STATUS_CODE } from "../utils/constants";
import { Result } from "../interfaces/result.interface";
import { IUser } from "../interfaces/user.interface";
import { UpdateUserDTO } from "../interfaces/user.dto";

export class UpdateUserUseCase {
  constructor(
    private readonly usersRepository: IUsersRepository,
    private geolocationService: GeolocationService
  ) {}

  async execute(id: string, data: UpdateUserDTO): Promise<Result<IUser>> {
    try {
      const auxData = {};

      const userExists = await this.usersRepository.getUserById(id);

      if (!userExists.data) {
        return {
          success: false,
          error: {
            code: HTTP_STATUS_CODE.USER_NOT_FOUND,
            message: "User not found",
          },
        };
      }

      if (data?.address && data.address !== userExists.data.address) {
        const coordinates =
          await this.geolocationService.getCoordinatesFromAddress(data.address);
        Object.assign(auxData, { coordinates });
      }

      if (
        data?.coordinates &&
        data.coordinates !== userExists.data.coordinates
      ) {
        const address = await this.geolocationService.getAddressFromCoordinates(
          data.coordinates.lat,
          data.coordinates.lng
        );
        Object.assign(auxData, { address });
      }

      const response = await this.usersRepository.updateUser(id, {
        ...data,
        ...auxData,
      });

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
