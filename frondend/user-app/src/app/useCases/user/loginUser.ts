// src/app/useCases/user/loginUser.ts
import { ILoginRequestDTO } from "@/domain/dtos/user/ILoginRequestDTO";
import { IUserRepository } from "../../repositories/IUserRepository";
import { ILoginResponseDTO } from "@/domain/dtos/user/ILoginResponseDTO";

export class LoginUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: ILoginRequestDTO): Promise<ILoginResponseDTO> {
    return await this.userRepository.login(data);
  }
}