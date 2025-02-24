import { faker } from "@faker-js/faker";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users.repository";
import { GeolocationService } from "../services/geolocation.service";
import { CreateUserUseCase } from "./create-user.usecase";

describe("CreateUserUseCase", () => {
  let createUserUseCase: CreateUserUseCase;
  let inMemoyUsersRepository: InMemoryUsersRepository;
  let geolocationService: GeolocationService;

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
      getCoordinatesFromAddress: jest.fn().mockResolvedValue(coordinates),
      getAddressFromCoordinates: jest.fn().mockResolvedValue(address),

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
  });

  it("should be to create a new user with address", async () => {
    const response = await createUserUseCase.execute({
      email,
      name,
      address,
    });

    expect(response.success).toBe(true);
  });
  it("should be to create a new user with coordinates", async () => {
    const response = await createUserUseCase.execute({
      email,
      name,
      coordinates,
    });

    expect(response.success).toBe(true);
  });

  it("should not be to create a new user with the same email", async () => {
    await createUserUseCase.execute({
      email,
      name,
      address,
    });

    const response = await createUserUseCase.execute({
      email,
      name,
      address,
    });

    expect(response.success).toBe(false);
  });
});
