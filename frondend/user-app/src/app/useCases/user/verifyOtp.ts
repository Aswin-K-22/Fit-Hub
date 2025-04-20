import { IVerifyOtpResponseDTO } from "../../../domain/dtos/common/IVerifyOtpResponseDTO";
import { IVerifyOtpRequestDTO } from "../../../domain/dtos/common/VerifyOtpRequestDTO";
import { IUserRepository } from "../../repositories/IUserRepository";

export class VerifyOtpUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: IVerifyOtpRequestDTO): Promise<IVerifyOtpResponseDTO> {
    return await this.userRepository.verifyOtp(data);
  }
}