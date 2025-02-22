import logger from "../config/logger";
import { IRegionsRepository } from "../repositories/regions.repository";

import { Result } from "../interfaces/result.interface";
import { HTTP_STATUS_CODE } from "../utils/constants";

export class DeleteRegionUseCase {
  constructor(private repository: IRegionsRepository) {}

  async execute(id: string): Promise<Result<string>> {
    try {
      const regionExists = await this.repository.getRegionById(id);

      if (!regionExists.data) {
        return {
          success: false,
          error: {
            code: HTTP_STATUS_CODE.GET_REGION_ERROR,
            message: "Region not found",
          },
        };
      }

      const response = await this.repository.deleteRegion(id);

      return response;
    } catch (error) {
      logger.error(error);
      return error;
    }
  }
}
