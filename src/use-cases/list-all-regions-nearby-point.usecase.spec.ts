import { faker } from "@faker-js/faker";
import { InMemoryRegionsRepository } from "../repositories/in-memory/in-memory-regions.repository";
import { ListRegionsNearByPointUseCase } from "./list-regions-nearby-point.usecase";

describe("ListAllRegionsNearbyPointUseCase", () => {
  let inMemoryRegionsRepository: InMemoryRegionsRepository;
  let listRegionsNearByPointUseCase: ListRegionsNearByPointUseCase;

  beforeEach(() => {
    inMemoryRegionsRepository = new InMemoryRegionsRepository();

    listRegionsNearByPointUseCase = new ListRegionsNearByPointUseCase(
      inMemoryRegionsRepository
    );
  });

  it("should be able to list all regions", async () => {
    await inMemoryRegionsRepository.createRegion({
      name: "region 1",
      user: faker.database.mongodbObjectId() as any,
      geometry: {
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
      },
    });

    const response = await listRegionsNearByPointUseCase.execute({
      lat: faker.location.latitude().toString(),
      lng: faker.location.longitude().toString(),
      maxDistance: "100",
    });

    expect(response.data).toHaveLength(1);
  });
});
