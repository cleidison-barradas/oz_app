import { Schema } from "mongoose";
import BaseModel from "./internals/base_model";
import { IUser } from "../../../interfaces/user.interface";

class User extends BaseModel<IUser> {
  constructor() {
    super();

    this._schemaName = "user";

    this._schemaDefinition = new Schema<IUser>({
      name: { type: String, required: true },
      email: { type: String, required: true },
      address: { type: String, required: true },
      coordinates: {
        type: Object,
      },
    });

    this._schemaDefinition.set("timestamps", true);
    this._schemaDefinition.set("versionKey", false);

    this._configureSchema();
  }
}

export default new User();
