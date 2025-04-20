// src/app/useCases/user/signupUser.ts
import { IUserRepository } from "@/app/repositories/IUserRepository";
import { ISignupRequestDTO } from "@/domain/dtos/user/ISignupRequestDTO";

export class SignupUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: ISignupRequestDTO): Promise<void> {
    return await this.userRepository.signup(data);
  }
}