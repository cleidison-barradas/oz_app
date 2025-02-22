import { MongoUsersRepository } from "../../repositories/mongo/mongo.users.repository";
import { DeleteUserUseCase } from "../delete-user.usecase";

export default function makeDeleteUserUseCase() {
  const repository = new MongoUsersRepository();

  return new DeleteUserUseCase(repository);
}
