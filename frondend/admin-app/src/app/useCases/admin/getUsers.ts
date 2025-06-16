// src/app/useCases/admin/getUsers.ts
import { IAdminRepository } from "../../repositories/IAdminRepository";
import { User } from "../../../domain/entities/admin/User";

export interface GetUsersResponse {
  users: User[];
  totalPages: number;
}

export class GetUsersUseCase {
  constructor(private userRepository: IAdminRepository) {}

  async execute(
    page: number,
    limit: number,
    search?: string,
    status?: string,
    membership?: string,
    isVerified?: string
  ): Promise<GetUsersResponse> {
    const response = await this.userRepository.getUsers(page, limit, search, status, membership, isVerified);
    return {
      users: response.users,
      totalPages: response.totalPages,
    };
  }
}