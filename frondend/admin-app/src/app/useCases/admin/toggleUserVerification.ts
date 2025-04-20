// src/app/useCases/admin/toggleUserVerification.ts
import { User } from "../../../domain/entities/user/User";
import { IAdminRepository } from "../../repositories/IAdminRepository";

export class ToggleUserVerificationUseCase {
  constructor(private userRepository: IAdminRepository) {}

  async execute(userId: string): Promise<User> {
    return await this.userRepository.toggleUserVerification(userId);
  }
}