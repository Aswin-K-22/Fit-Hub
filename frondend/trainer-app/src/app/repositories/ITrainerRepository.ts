// src/app/repositories/ITrainerRepository.ts
import { IResendOtpRequestDTO } from "../../domain/dtos/common/IResendOtpRequestDTO";
import { IVerifyOtpRequestDTO } from "../../domain/dtos/common/VerifyOtpRequestDTO";
import { ITrainerDashboardResponseDTO } from "../../domain/dtos/trainer/ITrainerDashboardResponseDTO";
import { ITrainerLoginRequestDTO } from "../../domain/dtos/trainer/ITrainerLoginRequestDTO";
import { ITrainerLoginResponseDTO } from "../../domain/dtos/trainer/ITrainerLoginResponseDTO";
import { ITrainerProfileResponseDTO } from "../../domain/dtos/trainer/ITrainerProfileResponseDTO";
import { ITrainerSignupRequestDTO } from "../../domain/dtos/trainer/ITrainerSignupRequestDTO";
import { IUpdateTrainerProfileRequestDTO } from "../../domain/dtos/trainer/IUpdateTrainerProfileRequestDTO";

export interface ITrainerRepository {
  login(data: ITrainerLoginRequestDTO): Promise<ITrainerLoginResponseDTO>;
  logout(email: string): Promise<void>;
  getTrainerProfile(): Promise<ITrainerProfileResponseDTO>;
  updateTrainerProfile(data: IUpdateTrainerProfileRequestDTO): Promise<ITrainerProfileResponseDTO>;
  getDashboardData(): Promise<ITrainerDashboardResponseDTO>;
  verifyTrainerOtp(data: IVerifyOtpRequestDTO): Promise<void>;
  resendTrainerOtp(data: IResendOtpRequestDTO): Promise<void>;
  signupTrainer(data: ITrainerSignupRequestDTO): Promise<void>;
  checkApprovalStatus(): Promise<{ isApproved: boolean }>;
}