import config from "../../config";
import { MongoUsersRepository } from "../../repositories/mongo/mongo.users.repository";
import { GeolocationService } from "../../services/geolocation.service";
import { UpdateUserUseCase } from "../update-user.usecase";

export default function makeUpdateUserUseCase() {
  const repository = new MongoUsersRepository();
  const geolocationService = new GeolocationService(
    config.geocoding.geocoding_api_url,
    config.geocoding.reverse_geocoding_api_url
  );

  return new UpdateUserUseCase(repository, geolocationService);
}
