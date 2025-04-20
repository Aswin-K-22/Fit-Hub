// src/app/useCases/admin/getTrainers.ts
import { IAdminRepository } from "../../repositories/IAdminRepository";
import { IGetTrainersResponseDTO } from "../../../domain/dtos/admin/IGetTrainersResponseDTO";

export class GetTrainersUseCase {
  constructor(private adminRepository: IAdminRepository) {}

  async execute(page: number, limit: number, status?: string): Promise<IGetTrainersResponseDTO> {
    return await this.adminRepository.getTrainers(page, limit, status);
  }
}