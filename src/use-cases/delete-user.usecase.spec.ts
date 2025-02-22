import { faker } from "@faker-js/faker";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users.repository";
import { DeleteUserUseCase } from "./delete-user.usecase";

describe("DeleteUserUseCase", () => {
  let deleteUserUseCase: DeleteUserUseCase;
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
    deleteUserUseCase = new DeleteUserUseCase(inMemoyUsersRepository);
  });

  it("should be able to delete a user", async () => {
    const userResponse = await inMemoyUsersRepository.createUser(mockUser);

    const response = await deleteUserUseCase.execute(
      String(userResponse.data._id)
    );

    expect(response.data).toBe(String(userResponse.data._id));
  });

  it("should not be able to delete a user that does not exist", async () => {
    const userResponse = await inMemoyUsersRepository.createUser(mockUser);

    const response = await deleteUserUseCase.execute(faker.string.uuid());

    expect(response.data).not.toBe(String(userResponse.data._id));
  });
});
