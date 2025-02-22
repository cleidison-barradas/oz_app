import { Schema } from "mongoose";
import BaseModel from "./internals/base_model";
import { IRegion } from "../../../interfaces/region.interface";

class Region extends BaseModel<IRegion> {
  constructor() {
    super();

    this._schemaName = "region";

    this._schemaDefinition = new Schema<IRegion>({
      name: { type: String, required: true },
      geometry: {
        type: { type: String, enum: ["Polygon"], required: true },
        coordinates: { type: [[[Number]]], required: true },
      },
      user: { type: Schema.Types.ObjectId, required: true, ref: "user" },
    });

    this._schemaDefinition.set("timestamps", true);
    this._schemaDefinition.set("versionKey", false);
    this._schemaDefinition.index({ geometry: "2dsphere" });
  }
}

export default new Region();
