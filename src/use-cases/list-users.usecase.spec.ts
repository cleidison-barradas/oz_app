import { faker } from "@faker-js/faker";
import { ListUsersUseCase } from "./list-users.usecase";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users.repository";

describe("ListUsersUseCase", () => {
  let listUsersUseCase: ListUsersUseCase;
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

  beforeAll(() => {
    inMemoyUsersRepository = new InMemoryUsersRepository();
    listUsersUseCase = new ListUsersUseCase(inMemoyUsersRepository);
  });

  it("should be able to list users", async () => {
    await inMemoyUsersRepository.createUser(mockUser);
    const response = await listUsersUseCase.execute();
    expect(response.data).toHaveLength(1);
  });
});
