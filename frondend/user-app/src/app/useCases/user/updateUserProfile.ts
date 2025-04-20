// src/app/useCases/user/updateUserProfile.ts
import { IUpdateUserProfileRequestDTO } from "../../../domain/dtos/user/IUpdateUserProfileRequestDTO";
import { UserProfileData } from "../../../domain/entities/user/User";
import { IUserRepository } from "../../repositories/IUserRepository";

export class UpdateUserProfileUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: IUpdateUserProfileRequestDTO): Promise<UserProfileData> {
    const response = await this.userRepository.updateUserProfile(data);
    return response.user;
  }
}