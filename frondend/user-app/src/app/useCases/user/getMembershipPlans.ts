// src/app/useCases/user/getMembershipPlans.ts
import { IMembershipPlansRequestDTO } from "../../../domain/dtos/common/IMembershipPlansRequestDTO";
import { IMembershipPlansResponseDTO } from "../../../domain/dtos/user/IMembershipPlansResponseDTO";
import { IUserRepository } from "../../repositories/IUserRepository";

export class GetMembershipPlansUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(params: IMembershipPlansRequestDTO): Promise<IMembershipPlansResponseDTO> {
    return this.userRepository.getMembershipPlans(params);
  }
}