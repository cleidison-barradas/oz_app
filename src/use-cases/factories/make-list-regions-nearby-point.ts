import { MongoRegionsRepository } from "../../repositories/mongo/mongo.regions.repository";
import { ListRegionsNearByPointUseCase } from "../list-regions-nearby-point.usecase";

export default function makeListRegionsNearbyPointUseCase() {
  const repository = new MongoRegionsRepository();

  return new ListRegionsNearByPointUseCase(repository);
}
