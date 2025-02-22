import logger from "../config/logger";
import { IRegionsRepository } from "../repositories/regions.repository";
import { GeolocationService } from "../services/geolocation.service";

import { HTTP_STATUS_CODE } from "../utils/constants";
import { IRegion } from "../interfaces/region.interface";
import { Result } from "../interfaces/result.interface";
import { UpdateRegionDTO } from "../interfaces/region.dto";

export class UpdateRegionUseCase {
  constructor(
    private repository: IRegionsRepository,
    private geolocationService: GeolocationService
  ) {}

  async execute(id: string, data: UpdateRegionDTO): Promise<Result<IRegion>> {
    try {
      let auxData = {};

      let response = await this.repository.getRegionById(id);

      if (!response.data) {
        return {
          success: false,
          error: {
            code: HTTP_STATUS_CODE.GET_REGION_ERROR,
            message: "Region not found",
          },
        };
      }

      if (data?.coordinates) {
        const geometry = this.geolocationService.createPolygon(
          data.coordinates.lat,
          data.coordinates.lng
        );

        Object.assign(auxData, { geometry });
      }

      response = await this.repository.updateRegion(id, {
        ...(data as any),
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
