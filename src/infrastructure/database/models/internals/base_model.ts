import { Model, Schema } from "mongoose";
import Paginate from "mongoose-paginate-v2";

export default class BaseModel<T> {
  _schemaName: string;
  _schemaDefinition: Schema<T>;
  _model: Model<T>;

  _configureSchema(): void {
    this._schemaDefinition.plugin(Paginate);
  }

  _setModel(mode: Model<T>): void {
    this._model = mode;
  }

  _getModel(): Model<T> {
    return this._model;
  }
}
