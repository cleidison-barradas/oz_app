import config from "../../config";
import { MongoRegionsRepository } from "../../repositories/mongo/mongo.regions.repository";
import { GeolocationService } from "../../services/geolocation.service";
import { UpdateRegionUseCase } from "../update-region.usecase";

export default function makeUpdateRegionUseCase() {
  const repository = new MongoRegionsRepository();
  const geolocationService = new GeolocationService(
    config.geocoding.geocoding_api_url,
    config.geocoding.reverse_geocoding_api_url
  );

  return new UpdateRegionUseCase(repository, geolocationService);
}
