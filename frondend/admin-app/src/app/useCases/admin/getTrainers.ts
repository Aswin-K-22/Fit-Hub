// src/app/useCases/admin/getTrainers.ts
import { IGetTrainersResponseDTO } from "../../../domain/dtos/admin/IGetTrainersResponseDTO";
import { IAdminRepository } from "../../../app/repositories/IAdminRepository";

export class GetTrainersUseCase {
  constructor(private adminRepository: IAdminRepository) {}

  async execute(
    page: number,
    limit: number,
    search?: string,
    status?: string,
    specialization?: string,
    
  ): Promise<IGetTrainersResponseDTO> {
    return await this.adminRepository.getTrainers(page, limit, search, status, specialization, );
  }
}