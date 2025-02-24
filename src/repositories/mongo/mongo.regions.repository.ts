import logger from "../../config/logger";
import { IRegionsRepository } from "../regions.repository";
import RegionModel from "../../infrastructure/database/models/region.model";

import { IRegion } from "../../interfaces/region.interface";
import { Result } from "../../interfaces/result.interface";
import { HTTP_STATUS_CODE } from "../../utils/constants";
import {
  QueryRegionsNearbyPointDTO,
  QueryRegionsPointDTO,
} from "../../interfaces/region.dto";

export class MongoRegionsRepository implements IRegionsRepository {
  async getRegionById(id: string): Promise<Result<IRegion>> {
    try {
      const Model = RegionModel._getModel();

      const region = await Model.findById(id).lean();

      return {
        success: true,
        data: region,
      };
    } catch (error) {
      logger.error(error);

      return {
        success: false,
        error: {
          code: HTTP_STATUS_CODE.GET_REGION_ERROR,
          message: error.message || "Error on get region",
        },
      };
    }
  }
  async listAllRegions(): Promise<Result<IRegion[]>> {
    try {
      const Model = RegionModel._getModel();

      const regions = await Model.find().lean();

      return {
        success: true,
        data: regions,
      };
    } catch (error) {
      logger.error(error);

      return {
        success: false,
        error: {
          code: HTTP_STATUS_CODE.GET_REGION_ERROR,
          message: error.message || "Error on list all regions",
        },
      };
    }
  }
  async listRegionPoint(
    query: QueryRegionsPointDTO
  ): Promise<Result<IRegion[]>> {
    try {
      const Model = RegionModel._getModel();

      const point = {
        type: "Point",
        coordinates: [parseFloat(query.lng), parseFloat(query.lat)],
      };

      const regions = await Model.find({
        geometry: {
          $geoIntersects: {
            $geometry: point,
          },
        },
      }).populate("user");

      return {
        success: true,
        data: regions,
      };
    } catch (error) {
      logger.error(error);

      return {
        success: false,
        error: {
          code: HTTP_STATUS_CODE.GET_REGION_ERROR,
          message: error.message || "Error on list all regions point",
        },
      };
    }
  }
  async listRegionsNearbyPoint(
    query: QueryRegionsNearbyPointDTO
  ): Promise<Result<IRegion[]>> {
    try {
      const Model = RegionModel._getModel();

      const point = {
        type: "Point",
        coordinates: [
          parseFloat(query.lng as string),
          parseFloat(query.lat as string),
        ],
      };

      const filter = query?.excludeOwnerUserId
        ? { user: { $ne: query.excludeOwnerUserId } }
        : {};

      const regions = await Model.find({
        ...filter,
        geometry: {
          $near: {
            $geometry: point,
            $maxDistance: parseFloat(query.maxDistance as string),
          },
        },
      }).populate("user");

      return {
        success: true,
        data: regions,
      };
    } catch (error) {
      logger.error(error);

      return {
        success: false,
        error: {
          code: HTTP_STATUS_CODE.GET_REGION_ERROR,
          message: error.message || "Error on list all regions nearby point",
        },
      };
    }
  }
  async createRegion(data: Omit<IRegion, "_id">): Promise<Result<IRegion>> {
    try {
      const Model = RegionModel._getModel();

      const region = await Model.create(data);

      return {
        success: true,
        data: region,
      };
    } catch (error) {
      logger.error(error);

      return {
        success: false,
        error: {
          code: HTTP_STATUS_CODE.CREATE_REGION_ERROR,
          message: error.message || "Error creating region",
        },
      };
    }
  }

  async updateRegion(
    id: string,
    data: Omit<IRegion, "_id" | "user">
  ): Promise<Result<IRegion>> {
    try {
      const Model = RegionModel._getModel();

      let region = await Model.findById(id);

      await region.updateOne(data);

      region = await Model.findById(id);

      return {
        success: true,
        data: region,
      };
    } catch (error) {
      logger.error(error);

      return {
        success: false,
        error: {
          code: HTTP_STATUS_CODE.UPDATE_REGION_ERROR,
          message: error.message || "Error updating region",
        },
      };
    }
  }

  async deleteRegion(id: string): Promise<Result<string>> {
    try {
      const Model = RegionModel._getModel();

      const region = await Model.findById(id);

      await region.deleteOne();

      return {
        success: true,
        data: id,
      };
    } catch (error) {
      logger.error(error);

      return {
        success: false,
        error: {
          code: HTTP_STATUS_CODE.DELETE_REGION_ERROR,
          message: error.message || "Error deleting region",
        },
      };
    }
  }
}
