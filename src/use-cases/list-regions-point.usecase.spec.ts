import { faker } from "@faker-js/faker";
import { InMemoryRegionsRepository } from "../repositories/in-memory/in-memory-regions.repository";
import { ListRegionsPointUseCase } from "./list-regions-point.usecase";

describe("ListRegionsPointUseCase", () => {
  let listRegionsPointUseCase: ListRegionsPointUseCase;
  let inMemoryRegionsRepository: InMemoryRegionsRepository;

  beforeEach(() => {
    inMemoryRegionsRepository = new InMemoryRegionsRepository();

    listRegionsPointUseCase = new ListRegionsPointUseCase(
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

    const response = await listRegionsPointUseCase.execute({
      lat: faker.location.latitude().toString(),
      lng: faker.location.longitude().toString(),
    });

    expect(response.success).toBe(true);
  });
});
