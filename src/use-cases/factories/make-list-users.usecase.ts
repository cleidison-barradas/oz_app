import { MongoUsersRepository } from "../../repositories/mongo/mongo.users.repository";
import { ListUsersUseCase } from "../list-users.usecase";

export default function makeListUsersUseCase() {
  const repository = new MongoUsersRepository();

  return new ListUsersUseCase(repository);
}
