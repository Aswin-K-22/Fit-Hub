// # Business logic
// src/app/useCases/user/fetchUsers.ts
import { User } from "../../../domain/entities/user/User";
import { IUserRepository } from "../../repositories/IUserRepository";

export class FetchUsersUseCase {
  constructor(private repository: IUserRepository) {}

  async execute(): Promise<User[]> {
    return this.repository.getUsers(); // Define getUsers in IUserRepository
  }
}