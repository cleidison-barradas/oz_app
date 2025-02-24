import config from "../../config";
import { MongoUsersRepository } from "../../repositories/mongo/mongo.users.repository";
import { GeolocationService } from "../../services/geolocation.service";
import { CreateUserUseCase } from "../create-user.usecase";

export default function makeCreateUserUseCase() {
  const usersRepository = new MongoUsersRepository();
  const geolocationService = new GeolocationService(
    config.geocoding.geocoding_api_url,
    config.geocoding.reverse_geocoding_api_url,
    config.geocoding.geocoding_api_key,
  );

  return new CreateUserUseCase(usersRepository, geolocationService);
}
