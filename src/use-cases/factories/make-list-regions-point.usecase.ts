import { MongoRegionsRepository } from "../../repositories/mongo/mongo.regions.repository";
import { ListRegionsPointUseCase } from "../list-regions-point.usecase";

export default function makeListRegionsPointUseCase() {
  const repository = new MongoRegionsRepository();

  return new ListRegionsPointUseCase(repository);
}
