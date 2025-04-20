// src/app/useCases/admin/logoutAdmin.ts
import { IAdminRepository } from "../../repositories/IAdminRepository";

export class LogoutAdminUseCase {
  constructor(private adminRepository: IAdminRepository) {}

  async execute(email: string): Promise<void> {
    await this.adminRepository.logout(email);
  }
}