// src/app/useCases/trainer/resendTrainerOtp.ts
import { IResendOtpRequestDTO } from "../../../domain/dtos/common/IResendOtpRequestDTO";
import { ITrainerRepository } from "../../repositories/ITrainerRepository";

export class ResendTrainerOtpUseCase {
  constructor(private trainerRepository: ITrainerRepository) {}

  async execute(data: IResendOtpRequestDTO): Promise<void> {
    await this.trainerRepository.resendTrainerOtp(data);
  }
}