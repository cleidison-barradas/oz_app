import { fa, faker } from "@faker-js/faker";
import { InMemoryRegionsRepository } from "../repositories/in-memory/in-memory-regions.repository";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users.repository";
import { GeolocationService } from "../services/geolocation.service";
import { CreateRegionUseCase } from "./create-region.usecase";
import { CreateUserUseCase } from "./create-user.usecase";
import { UpdateRegionUseCase } from "./update-region.usecase";

describe("UpdateRegionUseCase", () => {
  let createRegionUseCase: CreateRegionUseCase;
  let createUserUseCase: CreateUserUseCase;
  let updateRegionUseCase: UpdateRegionUseCase;
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

    updateRegionUseCase = new UpdateRegionUseCase(
      inMemoryRegionsRepository,
      geolocationService
    );
  });

  it("should be able to update a region", async () => {
    const userResponse = await createUserUseCase.execute(mockUser);

    const regionResponse = await createRegionUseCase.execute({
      name: regionMock.name,
      user_id: String(userResponse.data._id),
      coordinates: regionMock.coordinates,
    });

    const response = await updateRegionUseCase.execute(
      String(regionResponse.data._id),
      {
        name: faker.location.city(),
        coordinates: regionMock.coordinates,
      }
    );

    expect(response.data.name).not.toBe(regionResponse.data.name);
  });

  it("should not be able to update a region with a invalid id", async () => {
    await createRegionUseCase.execute({
      name: regionMock.name,
      user_id: faker.database.mongodbObjectId(),
      coordinates: regionMock.coordinates,
    });

    const responseUpdate = await updateRegionUseCase.execute(
      faker.database.mongodbObjectId(),
      {
        name: faker.location.city(),
        coordinates: regionMock.coordinates,
      }
    );

    expect(responseUpdate.success).toBe(false);
  });
});
