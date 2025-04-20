// src/app/useCases/trainer/logoutTrainer.ts
import { ITrainerRepository } from "../../repositories/ITrainerRepository";

export class LogoutTrainerUseCase {
  constructor(private trainerRepository: ITrainerRepository) {}

  async execute(email: string): Promise<void> {
    await this.trainerRepository.logout(email);
  }
}