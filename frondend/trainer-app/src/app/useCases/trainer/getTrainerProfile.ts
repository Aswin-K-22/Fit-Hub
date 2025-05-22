// src/app/useCases/trainer/getTrainerProfile.ts
import { ITrainerRepository } from "../../repositories/ITrainerRepository";
import { ITrainerProfileResponseDTO } from "@/domain/dtos/trainer/ITrainerProfileResponseDTO";

export class GetTrainerProfileUseCase {
  constructor(private trainerRepository: ITrainerRepository) {}

  async execute(): Promise<ITrainerProfileResponseDTO> {
    const response = await this.trainerRepository.getTrainerProfile();
    return {
     trainer: {
        ...response.trainer,
        verifiedByAdmin: response.trainer.verifiedByAdmin || false,
      },
    };
  }
}