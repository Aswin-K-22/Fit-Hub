// src/domain/dtos/IUserProfileResponseDTO.ts
import { UserProfileData } from "../../entities/user/User";

export interface IUserProfileResponseDTO {
  user: UserProfileData;
}