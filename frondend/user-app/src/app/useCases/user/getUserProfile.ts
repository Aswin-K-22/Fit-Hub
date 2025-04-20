// src/app/useCases/user/getUserProfile.ts
import { UserProfileData } from "../../../domain/entities/user/User";
import { IUserRepository } from "../../repositories/IUserRepository";

export class GetUserProfileUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(): Promise<UserProfileData> {
    const response = await this.userRepository.getUserProfile();
    return response.user;
  }
}