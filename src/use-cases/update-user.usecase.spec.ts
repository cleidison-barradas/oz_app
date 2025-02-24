import { faker } from "@faker-js/faker";

import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users.repository";
import { GeolocationService } from "../services/geolocation.service";
import { CreateUserUseCase } from "./create-user.usecase";
import { UpdateUserUseCase } from "./update-user.usecase";

describe("UpdateUserUseCase", () => {
  let updateUserUseCase: UpdateUserUseCase;
  let createUserUseCase: CreateUserUseCase;
  let geolocationService: GeolocationService;
  let inMemoyUsersRepository: InMemoryUsersRepository;

  const email = faker.internet.email();
  const name = faker.person.fullName();
  const address = faker.location.streetAddress({ useFullAddress: true });
  const coordinates = {
    lat: faker.location.latitude(),
    lng: faker.location.longitude(),
  };

  beforeEach(() => {
    inMemoyUsersRepository = new InMemoryUsersRepository();

    geolocationService = {
      geocodingApiUrl: "",
      reverseGeocodingApiUrl: "",
      getCoordinatesFromAddress: jest.fn().mockResolvedValue({
        lat: coordinates.lat,
        lng: coordinates.lng,
      }),
      getAddressFromCoordinates: jest.fn().mockResolvedValue(coordinates),

      createPolygon: jest.fn().mockResolvedValue({
        type: "Polygon",
        coordinates: [
          [
            [-63.902, -8.7611],
            [-63.902, -8.7611],
            [-63.902, -8.7611],
            [-63.902, -8.7611],
            [-63.902, -8.7611],
          ],
        ],
      }),
      fetchApi: jest.fn().mockResolvedValue({}),
    } as unknown as GeolocationService;

    createUserUseCase = new CreateUserUseCase(
      inMemoyUsersRepository,
      geolocationService
    );

    updateUserUseCase = new UpdateUserUseCase(
      inMemoyUsersRepository,
      geolocationService
    );
  });

  it("should be to update a user with address", async () => {
    const userResponse = await createUserUseCase.execute({
      email,
      name,
      address,
    });

    const response = await updateUserUseCase.execute(
      String(userResponse.data._id),
      {
        name: faker.person.fullName(),
        address: faker.location.streetAddress({ useFullAddress: true }),
      }
    );

    expect(userResponse.data.name).not.toBe(response.data.name);
  });

  it("should be to update a user with coordinates", async () => {
    const userResponse = await createUserUseCase.execute({
      email,
      name,
      coordinates,
    });

    const response = await updateUserUseCase.execute(
      String(userResponse.data._id),
      {
        name: faker.person.fullName(),
        coordinates: {
          lat: faker.location.latitude(),
          lng: faker.location.longitude(),
        },
      }
    );

    expect(userResponse.data.name).not.toBe(response.data.name);
  });

  it("should not be able to find a user", async () => {
    await createUserUseCase.execute({
      email,
      name,
      address,
    });

    const response = await updateUserUseCase.execute("123", {
      name: faker.person.fullName(),
    });

    expect(response.success).toBe(false);
  });
});
