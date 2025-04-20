// src/app/useCases/admin/getMembershipPlans.ts
import { IAdminRepository } from "../../repositories/IAdminRepository";
import { IGetMembershipPlansResponseDTO } from "../../../domain/dtos/admin/IGetMembershipPlansResponseDTO";

export class GetMembershipPlansUseCase {
  constructor(private adminRepository: IAdminRepository) {}

  async execute(page: number, limit: number): Promise<IGetMembershipPlansResponseDTO> {
    return await this.adminRepository.getMembershipPlans(page, limit);
  }
}