import logger from "../config/logger";
import { IRegionsRepository } from "../repositories/regions.repository";
import { GeolocationService } from "../services/geolocation.service";

import { CreateRegionDTO } from "../interfaces/region.dto";
import { IRegion } from "../interfaces/region.interface";
import { Result } from "../interfaces/result.interface";
import { HTTP_STATUS_CODE } from "../utils/constants";
import { Types } from "mongoose";
import { IUsersRepository } from "../repositories/users.repository";

export class CreateRegionUseCase {
  constructor(
    private regionRepository: IRegionsRepository,
    private usersRepository: IUsersRepository,
    private geolocationService: GeolocationService
  ) {}

  async execute(data: CreateRegionDTO): Promise<Result<IRegion>> {
    try {
      const { name, user_id } = data;

      const userExists = await this.usersRepository.getUserById(user_id);

      if (!userExists.data) {
        return {
          success: false,
          error: {
            code: HTTP_STATUS_CODE.USER_NOT_FOUND,
            message: "User not found",
          },
        };
      }

      const geometry = this.geolocationService.createPolygon(
        Number(data.coordinates.lat),
        Number(data.coordinates.lng)
      );

      const response = await this.regionRepository.createRegion({
        name,
        user: new Types.ObjectId(user_id),
        geometry,
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
