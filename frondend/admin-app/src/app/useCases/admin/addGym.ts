/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/useCases/admin/addGym.ts
import { IAdminRepository } from "../../repositories/IAdminRepository";

export class AddGymUseCase {
  constructor(private adminRepository: IAdminRepository) {}

  async execute(data: FormData): Promise<any> {
    return await this.adminRepository.addGym(data);
  }
}

// Fetch trainers use case
export class GetAvailableTrainersUseCase {
  constructor(private adminRepository: IAdminRepository) {}

  async execute(): Promise<{ id: string; name: string; active: boolean }[]> {
    return await this.adminRepository.getAvailableTrainers();
  }
}