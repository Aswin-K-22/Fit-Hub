import { IVerifyOtpRequestDTO } from "../../../domain/dtos/common/VerifyOtpRequestDTO";
import { IUserRepository } from "../../repositories/IUserRepository";

export class VerifyForgotPasswordOtpUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: IVerifyOtpRequestDTO): Promise<void> {
    await this.userRepository.verifyForgotPasswordOtp(data);
  }
}