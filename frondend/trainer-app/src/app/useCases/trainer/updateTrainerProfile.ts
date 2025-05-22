// src/app/useCases/trainer/updateTrainerProfile.ts
import { ITrainerRepository } from "../../repositories/ITrainerRepository";
import { IUpdateTrainerProfileRequestDTO } from "../../../domain/dtos/trainer/IUpdateTrainerProfileRequestDTO";
import { ITrainerProfileResponseDTO } from "@/domain/dtos/trainer/ITrainerProfileResponseDTO";

// src/app/useCases/trainer/updateTrainerProfile.ts
export class UpdateTrainerProfileUseCase {
  constructor(private trainerRepository: ITrainerRepository) {}

  async execute(data: IUpdateTrainerProfileRequestDTO): Promise<ITrainerProfileResponseDTO> {
    return await this.trainerRepository.updateTrainerProfile(data);
  }
}