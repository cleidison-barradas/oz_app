import { MongoRegionsRepository } from "../../repositories/mongo/mongo.regions.repository";
import { ListAllRegionsUseCase } from "../list-all-regions.usecase";

export default function makeListAllRegionsUseCase() {
  const repository = new MongoRegionsRepository();

  return new ListAllRegionsUseCase(repository);
}
