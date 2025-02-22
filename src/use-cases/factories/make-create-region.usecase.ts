import config from "../../config";
import { MongoRegionsRepository } from "../../repositories/mongo/mongo.regions.repository";
import { MongoUsersRepository } from "../../repositories/mongo/mongo.users.repository";
import { GeolocationService } from "../../services/geolocation.service";
import { CreateRegionUseCase } from "../create-region.usecase";

export default function makeCreateRegionUseCase() {
  const regionRepository = new MongoRegionsRepository();
  const usersRepository = new MongoUsersRepository();

  const geolocationService = new GeolocationService(
    config.geocoding.geocoding_api_url,
    config.geocoding.reverse_geocoding_api_url
  );

  return new CreateRegionUseCase(
    regionRepository,
    usersRepository,
    geolocationService
  );
}
