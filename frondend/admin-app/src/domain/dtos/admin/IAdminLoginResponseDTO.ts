// src/domain/dtos/IAdminLoginResponseDTO.ts
import { User } from "../../entities/user/User";

export interface IAdminLoginResponseDTO {
  user: User;
}