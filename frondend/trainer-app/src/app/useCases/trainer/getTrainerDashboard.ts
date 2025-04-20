// src/app/useCases/trainer/getTrainerDashboard.ts
import { ITrainerRepository } from "../../repositories/ITrainerRepository";
import { ITrainerDashboardResponseDTO } from "../../../domain/dtos/trainer/ITrainerDashboardResponseDTO";

export class GetTrainerDashboardUseCase {
  constructor(private trainerRepository: ITrainerRepository) {}

  async execute(): Promise<ITrainerDashboardResponseDTO> {
    return await this.trainerRepository.getDashboardData();
  }
}