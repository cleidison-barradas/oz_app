import logger from "../config/logger";
import { IRegion } from "../interfaces/region.interface";
import { Result } from "../interfaces/result.interface";
import { IRegionsRepository } from "../repositories/regions.repository";

export class ListAllRegionsUseCase {
  constructor(private repository: IRegionsRepository) {}

  async execute(): Promise<Result<IRegion[]>> {
    try {
      const response = await this.repository.listAllRegions();

      return response;
    } catch (error) {
      logger.error(error);
      return error;
    }
  }
}
