import { IVerifyOtpRequestDTO } from "../../../domain/dtos/common/VerifyOtpRequestDTO";
import { ITrainerRepository } from "../../repositories/ITrainerRepository";

export class VerifyTrainerOtpUseCase {
    constructor(private trainerRepository: ITrainerRepository) {}

    async execute(data: IVerifyOtpRequestDTO): Promise<void> {
        return await this.trainerRepository.verifyTrainerOtp(data);
      }
    }