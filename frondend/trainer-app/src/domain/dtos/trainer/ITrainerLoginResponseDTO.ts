// src/domain/dtos/trainer/ITrainerLoginResponseDTO.ts
import { UserAuth } from "../../../domain/entities/common/UserAuth";

export interface ITrainerLoginResponseDTO {

  trainer: UserAuth,
}