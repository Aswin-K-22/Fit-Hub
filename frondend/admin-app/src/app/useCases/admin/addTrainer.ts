/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/useCases/admin/addTrainer.ts
import { IAdminRepository } from "../../repositories/IAdminRepository";
import { IAddTrainerDataDTO } from "../../../domain/dtos/trainer/IAddTrainerDataDTO";

export class AddTrainerUseCase {
  constructor(private adminRepository: IAdminRepository) {}

  async execute(data: IAddTrainerDataDTO): Promise<any> {
    return await this.adminRepository.addTrainer(data);
  }
}