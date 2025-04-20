
// src/app/useCases/trainer/signupTrainer.ts
import { ITrainerSignupRequestDTO } from "../../../domain/dtos/trainer/ITrainerSignupRequestDTO";
import { ITrainerRepository } from "../../repositories/ITrainerRepository";

export class SignupTrainerUseCase {
  constructor(private trainerRepository: ITrainerRepository) {}

  async execute(data: ITrainerSignupRequestDTO): Promise<void> {
    await this.trainerRepository.signupTrainer(data);
  }
}