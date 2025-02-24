import { faker } from "@faker-js/faker";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users.repository";
import { GeolocationService } from "../services/geolocation.service";
import { CreateRegionUseCase } from "./create-region.usecase";
import { CreateUserUseCase } from "./create-user.usecase";
import { InMemoryRegionsRepository } from "../repositories/in-memory/in-memory-regions.repository";

describe("CreateRegionUseCase", () => {
  let createRegionUseCase: CreateRegionUseCase;
  let createUserUseCase: CreateUserUseCase;
  let geolocationService: GeolocationService;
  let inMemoyUsersRepository: InMemoryUsersRepository;
  let inMemoryRegionsRepository: InMemoryRegionsRepository;

  const mockUser = {
    email: faker.internet.email(),
    name: faker.person.fullName(),
    address: faker.location.streetAddress({ useFullAddress: true }),
    coordinates: {
      lat: faker.location.latitude(),
      lng: faker.location.longitude(),
    },
  };

  const regionMock = {
    name: faker.location.city(),
    coordinates: {
      lat: faker.location.latitude(),
      lng: faker.location.longitude(),
    },
  };

  beforeEach(() => {
    inMemoyUsersRepository = new InMemoryUsersRepository();
    inMemoryRegionsRepository = new InMemoryRegionsRepository();

    geolocationService = {
      geocodingApiUrl: "",
      reverseGeocodingApiUrl: "",
      getCoordinatesFromAddress: jest
        .fn()
        .mockResolvedValue(mockUser.coordinates),
      getAddressFromCoordinates: jest.fn().mockResolvedValue(mockUser.address),

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

    createRegionUseCase = new CreateRegionUseCase(
      inMemoryRegionsRepository,
      inMemoyUsersRepository,
      geolocationService
    );
  });

  it("should be able to create a region", async () => {
    const userResponse = await createUserUseCase.execute(mockUser);

    const response = await createRegionUseCase.execute({
      name: regionMock.name,
      user_id: String(userResponse.data._id),
      coordinates: regionMock.coordinates,
    });

    expect(response.success).toBe(true);
  });

  it("should not be able to create a region with a invalid user id", async () => {
    await createUserUseCase.execute(mockUser);

    const response = await createRegionUseCase.execute({
      name: regionMock.name,
      user_id: faker.database.mongodbObjectId(),
      coordinates: regionMock.coordinates,
    });

    expect(response.success).toBe(false);
  });
});
