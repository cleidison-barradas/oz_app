import { faker } from "@faker-js/faker";
import { InMemoryRegionsRepository } from "../repositories/in-memory/in-memory-regions.repository";
import { ListAllRegionsUseCase } from "./list-all-regions.usecase";

describe("ListAllRegionsUseCase", () => {
  let listAllRegionsUseCase: ListAllRegionsUseCase;
  let inMemoryRegionsRepository: InMemoryRegionsRepository;

  beforeEach(() => {
    inMemoryRegionsRepository = new InMemoryRegionsRepository();

    listAllRegionsUseCase = new ListAllRegionsUseCase(
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

    const response = await listAllRegionsUseCase.execute();

    expect(response.data).toHaveLength(1);
  });
});
