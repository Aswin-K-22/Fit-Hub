/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/useCases/admin/addMembershipPlan.ts
import { IAdminRepository } from "../../repositories/IAdminRepository";
import { IAddMembershipPlanRequestDTO } from "../../../domain/dtos/admin/IAddMembershipPlanRequestDTO";

export class AddMembershipPlanUseCase {
  constructor(private adminRepository: IAdminRepository) {}

  async execute(data: IAddMembershipPlanRequestDTO): Promise<any> {
    return await this.adminRepository.addMembershipPlan(data);
  }
}