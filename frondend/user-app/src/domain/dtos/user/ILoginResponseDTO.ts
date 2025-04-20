// src/domain/dtos/ILoginResponseDTO.ts

import { UserAuth } from "../../entities/common/UserAuth";

export interface ILoginResponseDTO {
  user: UserAuth;
}