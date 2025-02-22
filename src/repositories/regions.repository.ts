import { IRegion } from "../interfaces/region.interface";
import { Result } from "../interfaces/result.interface";
import {
  QueryRegionsNearbyPointDTO,
  QueryRegionsPointDTO,
} from "../interfaces/region.dto";

export interface IRegionsRepository {
  getRegionById(id: string): Promise<Result<IRegion>>;
  listAllRegions(): Promise<Result<IRegion[]>>;
  listRegionPoint(query: QueryRegionsPointDTO): Promise<Result<IRegion[]>>;
  listRegionsNearbyPoint(
    query: QueryRegionsNearbyPointDTO
  ): Promise<Result<IRegion[]>>;
  createRegion(data: Omit<IRegion, "_id">): Promise<Result<IRegion>>;
  updateRegion(
    id: string,
    data: Omit<IRegion, "_id" | "user">
  ): Promise<Result<IRegion>>;
  deleteRegion(id: string): Promise<Result<string>>;
}
