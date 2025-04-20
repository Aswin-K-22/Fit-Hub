// src/app/useCases/admin/loginAdmin.ts
import { IAdminRepository } from "../../repositories/IAdminRepository";
import { IAdminLoginRequestDTO } from "../../../domain/dtos/admin/IAdminLoginRequestDTO";
import { IAdminLoginResponseDTO } from "../../../domain/dtos/admin/IAdminLoginResponseDTO";

export class LoginAdminUseCase {
  constructor(private adminRepository: IAdminRepository) {}

  async execute(data: IAdminLoginRequestDTO): Promise<IAdminLoginResponseDTO> {
    return await this.adminRepository.login(data);
  }
}