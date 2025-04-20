// src/app/useCases/trainer/updateTrainerProfile.ts
import { ITrainerRepository } from "../../repositories/ITrainerRepository";
import { IUpdateTrainerProfileRequestDTO } from "../../../domain/dtos/trainer/IUpdateTrainerProfileRequestDTO";
import { TrainerProfileData } from "../../../domain/entities/trainer/Trainer";

export class UpdateTrainerProfileUseCase {
  constructor(private trainerRepository: ITrainerRepository) {}

  async execute(data: IUpdateTrainerProfileRequestDTO): Promise<TrainerProfileData> {
    const response = await this.trainerRepository.updateTrainerProfile(data);
    return response.trainer;
  }
}