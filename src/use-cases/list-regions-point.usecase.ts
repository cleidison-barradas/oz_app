import { IRegionsRepository } from "../repositories/regions.repository";

import { IRegion } from "../interfaces/region.interface";
import { Result } from "../interfaces/result.interface";
import { QueryRegionsPointDTO } from "../interfaces/region.dto";

export class ListRegionsPointUseCase {
  constructor(private repository: IRegionsRepository) {}

  async execute(query: QueryRegionsPointDTO): Promise<Result<IRegion[]>> {
    try {
      const response = await this.repository.listRegionPoint(query);

      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}
