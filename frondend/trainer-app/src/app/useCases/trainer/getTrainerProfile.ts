// src/app/useCases/trainer/getTrainerProfile.ts
import { ITrainerRepository } from "../../repositories/ITrainerRepository";
import { TrainerProfileData } from "../../../domain/entities/trainer/Trainer";

export class GetTrainerProfileUseCase {
  constructor(private trainerRepository: ITrainerRepository) {}

  async execute(): Promise<TrainerProfileData> {
    const response = await this.trainerRepository.getTrainerProfile();
    return {
      ...response.trainer,
      verifiedByAdmin: response.trainer.verifiedByAdmin || false, 
    };
  }
}