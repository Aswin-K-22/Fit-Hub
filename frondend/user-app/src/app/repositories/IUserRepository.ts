import { IGymSearchDTO } from "../../domain/dtos/user/IGymSearchDTO";
import { ILoginRequestDTO } from "../../domain/dtos/user/ILoginRequestDTO";
import { ILoginResponseDTO } from "../../domain/dtos/user/ILoginResponseDTO";
import { IMembershipPlansRequestDTO } from "../../domain/dtos/common/IMembershipPlansRequestDTO";
import { IMembershipPlansResponseDTO } from "../../domain/dtos/user/IMembershipPlansResponseDTO";
import { ISignupRequestDTO } from "../../domain/dtos/user/ISignupRequestDTO";
import { IUpdateUserProfileRequestDTO } from "../../domain/dtos/user/IUpdateUserProfileRequestDTO";
import { IUserProfileResponseDTO } from "../../domain/dtos/user/IUserProfileResponseDTO";
import { Gym } from "../../domain/entities/common/Gym";
import { IResendOtpRequestDTO } from "../../domain/dtos/common/IResendOtpRequestDTO";
import { IVerifyOtpResponseDTO } from "../../domain/dtos/common/IVerifyOtpResponseDTO";
import { IVerifyOtpRequestDTO } from "../../domain/dtos/common/VerifyOtpRequestDTO";
import { IGoogleAuthResponseDTO } from "../../domain/dtos/user/IGoogleAuthResponseDTO";
import { IGoogleAuthRequestDTO } from "../../domain/dtos/user/IGoogleAuthRequestDTO";
import { ISubscribeToPlanResponseDTO, IVerifyPaymentRequestDTO } from "../../domain/dtos/user/ISubscribeToPlanResponseDTO";
import { IGymDetailsDTO } from "../../domain/dtos/user/IGymDetailsDTO";

// src/app/repositories/IUserRepository.ts
export interface IUserRepository {
  login(data: ILoginRequestDTO): Promise<ILoginResponseDTO>;
  signup(data: ISignupRequestDTO): Promise<void>;
  googleAuth(data: IGoogleAuthRequestDTO): Promise<IGoogleAuthResponseDTO>;
  logout(email: string): Promise<void>;
  fetchGyms(params: IGymSearchDTO): Promise<{ gyms: Gym[]; totalPages: number; totalGyms: number }>;
  getMembershipPlans(params: IMembershipPlansRequestDTO): Promise<IMembershipPlansResponseDTO>;
  getUserProfile(): Promise<IUserProfileResponseDTO>;
  updateUserProfile(data: IUpdateUserProfileRequestDTO): Promise<IUserProfileResponseDTO>;
  verifyOtp(data: IVerifyOtpRequestDTO): Promise<IVerifyOtpResponseDTO>;
  resendOtp(data: IResendOtpRequestDTO): Promise<void>;
  verifyForgotPasswordOtp(data: IVerifyOtpRequestDTO): Promise<void>;
  subscribeToPlan(planId: string): Promise<ISubscribeToPlanResponseDTO>;
  verifyPayment(data: IVerifyPaymentRequestDTO): Promise<void>;
  fetchGymDetails(gymId: string): Promise<IGymDetailsDTO>;
}