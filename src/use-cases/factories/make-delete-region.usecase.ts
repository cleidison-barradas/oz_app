import { MongoRegionsRepository } from "../../repositories/mongo/mongo.regions.repository";
import { DeleteRegionUseCase } from "../delete-region.usecase";

export default function makeDeleteRegionUseCase() {
  const repository = new MongoRegionsRepository();

  return new DeleteRegionUseCase(repository);
}
