import { IAdminRepository } from "../../repositories/IAdminRepository";

export class ApproveTrainerUseCase {
  constructor(private adminRepository: IAdminRepository) {}

  async execute(trainerId: string): Promise<void> {
    await this.adminRepository.approveTrainer(trainerId);
  }
}