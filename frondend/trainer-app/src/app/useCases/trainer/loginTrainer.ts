// src/app/useCases/trainer/loginTrainer.ts
import { ITrainerLoginRequestDTO } from "../../../domain/dtos/trainer/ITrainerLoginRequestDTO";
import { ITrainerLoginResponseDTO } from "../../../domain/dtos/trainer/ITrainerLoginResponseDTO";
import { ITrainerRepository } from "../../repositories/ITrainerRepository";

export class LoginTrainerUseCase {
  constructor(private trainerRepository: ITrainerRepository) {}

  async execute(data: ITrainerLoginRequestDTO): Promise<ITrainerLoginResponseDTO> {
    return await this.trainerRepository.login(data);
  }
}