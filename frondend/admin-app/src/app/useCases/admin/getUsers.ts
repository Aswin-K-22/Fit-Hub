// src/app/useCases/admin/getUsers.ts
import { IAdminRepository } from "../../repositories/IAdminRepository";
import { User } from "../../../domain/entities/user/User";

export interface GetUsersResponse {
  users: User[];
  totalPages: number;
}

export class GetUsersUseCase {
  constructor(private userRepository: IAdminRepository) {}

  async execute(page: number, limit: number): Promise<GetUsersResponse> {
    const response = await this.userRepository.getUsers(page, limit);
    return {
      users: response.users,
      totalPages: response.totalPages,
    };
  }
}