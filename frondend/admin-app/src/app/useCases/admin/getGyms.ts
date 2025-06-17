// src/app/useCases/admin/getGyms.ts
import { IGetGymsResponseDTO } from "../../../domain/dtos/admin/IGetGymsResponseDTO";
import { IAdminRepository } from "../../repositories/IAdminRepository";

export class GetGymsUseCase {
  constructor(private adminRepository: IAdminRepository) {}

  async execute(page: number, limit: number, search?: string): Promise<IGetGymsResponseDTO> {
    return await this.adminRepository.getGyms(page, limit, search);
  }
}