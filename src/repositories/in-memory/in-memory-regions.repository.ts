import { Types } from "mongoose";
import {
  QueryRegionsPointDTO,
  QueryRegionsNearbyPointDTO,
} from "../../interfaces/region.dto";
import { IRegion } from "../../interfaces/region.interface";
import { Result } from "../../interfaces/result.interface";
import { IRegionsRepository } from "../regions.repository";

export class InMemoryRegionsRepository implements IRegionsRepository {
  private regions: IRegion[] = [];

  async getRegionById(id: string): Promise<Result<IRegion>> {
    const region = this.regions.find((region) => String(region._id) === id);

    return {
      success: true,
      data: region,
    };
  }
  async listAllRegions(): Promise<Result<IRegion[]>> {
    const regions = this.regions;
    return {
      success: true,
      data: regions,
    };
  }
  async listRegionPoint(
    query: QueryRegionsPointDTO
  ): Promise<Result<IRegion[]>> {
    const regions = this.regions;
    return {
      success: true,
      data: regions,
    };
  }
  async listRegionsNearbyPoint(
    query: QueryRegionsNearbyPointDTO
  ): Promise<Result<IRegion[]>> {
    const regions = this.regions;

    return {
      success: true,
      data: regions,
    };
  }
  async createRegion(data: Omit<IRegion, "_id">): Promise<Result<IRegion>> {
    this.regions.push({
      _id: String(new Types.ObjectId()) as any,
      ...data,
    });

    return {
      success: true,
      data: this.regions[this.regions.length - 1],
    };
  }
  async updateRegion(
    id: string,
    data: Omit<IRegion, "_id" | "user">
  ): Promise<Result<IRegion>> {
    const index = this.regions.findIndex((region) => String(region._id) === id);

    this.regions[index] = {
      ...this.regions[index],
      ...data,
    };

    return {
      success: true,
      data: this.regions[index],
    };
  }
  async deleteRegion(id: string): Promise<Result<string>> {
    const index = this.regions.findIndex((region) => String(region._id) === id);

    this.regions.splice(index, 1);

    return {
      success: true,
      data: id,
    };
  }
}
