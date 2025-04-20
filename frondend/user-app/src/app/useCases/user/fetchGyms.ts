// src/app/useCases/user/fetchGyms.ts
import { IGymSearchDTO } from "../../../domain/dtos/user/IGymSearchDTO";
import { Gym } from "../../../domain/entities/common/Gym";
import { IUserRepository } from "../../repositories/IUserRepository";

export class FetchGymsUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(params: IGymSearchDTO): Promise<{ gyms: Gym[]; totalPages: number; totalGyms: number }> {
    return this.userRepository.fetchGyms(params);
  }
}