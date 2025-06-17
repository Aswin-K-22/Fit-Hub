// src/domain/dtos/trainer/ITrainerLoginResponseDTO.ts

import { TrainerAuth } from "@/domain/entities/common/UserAuth";

export interface ITrainerLoginResponseDTO {

  trainer: TrainerAuth,
}