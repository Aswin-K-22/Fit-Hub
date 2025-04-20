import { IResendOtpRequestDTO } from "../../../domain/dtos/common/IResendOtpRequestDTO";
import { IUserRepository } from "../../repositories/IUserRepository";

export class ResendOtpUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: IResendOtpRequestDTO): Promise<void> {
    await this.userRepository.resendOtp(data);
  }
}