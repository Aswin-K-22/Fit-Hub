// src/app/useCases/user/googleAuthUser.ts
import { IGoogleAuthRequestDTO } from "../../../domain/dtos/user/IGoogleAuthRequestDTO";
import { IGoogleAuthResponseDTO } from "../../../domain/dtos/user/IGoogleAuthResponseDTO";
import { IUserRepository } from "../../repositories/IUserRepository";

export class GoogleAuthUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: IGoogleAuthRequestDTO): Promise<IGoogleAuthResponseDTO> {
    return await this.userRepository.googleAuth(data);
  }
}