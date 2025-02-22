import { faker } from "@faker-js/faker";
import { GeolocationService } from "../services/geolocation.service";
import { CreateRegionUseCase } from "./create-region.usecase";
import { DeleteRegionUseCase } from "./delete-region.usecase";
import { CreateUserUseCase } from "./create-user.usecase";

import { InMemoryRegionsRepository } from "../repositories/in-memory/in-memory-regions.repository";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users.repository";

describe("DeleteRegionUseCase", () => {
  let deleteRegionUseCase: DeleteRegionUseCase;
  let createRegionUseCase: CreateRegionUseCase;
  let createUserUseCase: CreateUserUseCase;
  let geolocationService: GeolocationService;
  let inMewRegionsRepository: InMemoryRegionsRepository;
  let inMemoyUsersRepository: InMemoryUsersRepository;

  const mockUser = {
    email: faker.internet.email(),
    name: faker.person.fullName(),
    address: faker.location.streetAddress({ useFullAddress: true }),
    coordinates: {
      lat: faker.location.latitude(),
      lng: faker.location.longitude(),
    },
  };

  beforeEach(() => {
    inMemoyUsersRepository = new InMemoryUsersRepository();
    inMewRegionsRepository = new InMemoryRegionsRepository();

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

    deleteRegionUseCase = new DeleteRegionUseCase(inMewRegionsRepository);

    createRegionUseCase = new CreateRegionUseCase(
      inMewRegionsRepository,
      inMemoyUsersRepository,
      geolocationService
    );

    createUserUseCase = new CreateUserUseCase(
      inMemoyUsersRepository,
      geolocationService
    );
  });

  it("should be able to delete a region", async () => {
    const userResponse = await createUserUseCase.execute(mockUser);

    const regionResponse = await createRegionUseCase.execute({
      name: faker.location.city(),
      user_id: String(userResponse.data._id),
      coordinates: {
        lat: faker.location.latitude(),
        lng: faker.location.longitude(),
      },
    });

    const response = await deleteRegionUseCase.execute(
      String(regionResponse.data._id)
    );

    expect(response.success).toBe(true);
  });

  it("should not be able to delete a region with a invalid id", async () => {
    const response = await deleteRegionUseCase.execute(
      String(faker.database.mongodbObjectId())
    );

    expect(response.success).toBe(false);
  });
});
