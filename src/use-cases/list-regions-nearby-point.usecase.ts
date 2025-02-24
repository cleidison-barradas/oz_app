import logger from "../config/logger";
import { IRegionsRepository } from "../repositories/regions.repository";

import { IRegion } from "../interfaces/region.interface";
import { Result } from "../interfaces/result.interface";
import { QueryRegionsNearbyPointDTO } from "../interfaces/region.dto";

export class ListRegionsNearByPointUseCase {
  constructor(private repository: IRegionsRepository) {}

  async execute(query: QueryRegionsNearbyPointDTO): Promise<Result<IRegion[]>> {
    try {
      const response = await this.repository.listRegionsNearbyPoint(query);

      return response;
    } catch (error) {
      logger.error(error);
      return error;
    }
  }
}
