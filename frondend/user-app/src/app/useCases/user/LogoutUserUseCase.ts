// src/app/useCases/user/LogoutUserUseCase.ts
import { IUserRepository } from "../../repositories/IUserRepository";

export class LogoutUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(email: string): Promise<void> {
    return await this.userRepository.logout(email);
  }
}