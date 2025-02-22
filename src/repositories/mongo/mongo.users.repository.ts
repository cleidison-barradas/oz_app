import logger from "../../config/logger";
import { IUsersRepository } from "../users.repository";
import UserModel from "../../infrastructure/database/models/user.model";

import { IUser } from "../../interfaces/user.interface";
import { Result } from "../../interfaces/result.interface";
import { HTTP_STATUS_CODE } from "../../utils/constants";

export class MongoUsersRepository implements IUsersRepository {
  async getUserByEmail(email: string): Promise<Result<IUser>> {
    try {
      const model = UserModel._getModel();

      const user = await model.findOne({ email });

      return {
        success: true,
        data: user,
      };
    } catch (error) {
      logger.error(error);

      return {
        success: false,
        error: {
          code: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
          message: error.message || "Error on get user by email",
        },
      };
    }
  }
  async getUserById(id: string): Promise<Result<IUser>> {
    try {
      const model = UserModel._getModel();

      const user = await model.findById(id);

      return {
        success: true,
        data: user,
      };
    } catch (error) {
      logger.error(error);

      return {
        success: false,
        error: {
          code: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
          message: error.message || "Error on get user by id",
        },
      };
    }
  }
  async listUsers(): Promise<Result<IUser[]>> {
    try {
      const model = UserModel._getModel();

      const users = await model.find().lean();

      return {
        success: true,
        data: users,
      };
    } catch (error) {
      logger.error(error);

      return {
        success: false,
        error: {
          code: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
          message: error.message || "Error on list users",
        },
      };
    }
  }

  async createUser(data: Omit<IUser, "_id">): Promise<Result<IUser>> {
    try {
      const model = UserModel._getModel();

      const user = await model.create(data);

      return {
        success: true,
        data: user,
      };
    } catch (error) {
      logger.error(error);

      return {
        success: false,
        error: {
          code: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
          message: error.message || "Error on create user",
        },
      };
    }
  }

  async updateUser(
    id: string,
    data: Omit<IUser, "_id" | "email">
  ): Promise<Result<IUser>> {
    try {
      const model = UserModel._getModel();

      let user = await model.findById(id);

      await user.updateOne(data);

      user = await model.findById(id);

      return {
        success: true,
        data: user,
      };
    } catch (error) {
      logger.error(error);

      return {
        success: false,
        error: {
          code: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
          message: error.message || "Error on update user",
        },
      };
    }
  }

  async deleteUser(id: string): Promise<Result<string>> {
    try {
      const model = UserModel._getModel();

      const user = await model.findById(id);

      await user.deleteOne();

      return {
        success: true,
        data: id,
      };
    } catch (error) {
      logger.error(error);

      return {
        success: false,
        error: {
          code: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
          message: error.message || "Error on delete user",
        },
      };
    }
  }
}
