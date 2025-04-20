import { IAdminRepository } from "../../repositories/IAdminRepository";

export class GetTrainerDetailsUseCase {
  constructor(private adminRepository: IAdminRepository) {}

  async execute(trainerId: string): Promise<any> {
    return this.adminRepository.getTrainerDetails(trainerId);
  }
}