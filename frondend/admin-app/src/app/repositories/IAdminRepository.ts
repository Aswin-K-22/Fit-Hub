/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/repositories/IAdminRepository.ts

import { IAdminLoginRequestDTO } from "../../domain/dtos/admin/IAdminLoginRequestDTO";
import { IAdminLoginResponseDTO } from "../../domain/dtos/admin/IAdminLoginResponseDTO";
//import { IAddTrainerDataDTO } from "../../domain/dtos/trainer/IAddTrainerDataDTO";
import { IAddMembershipPlanRequestDTO } from "../../domain/dtos/admin/IAddMembershipPlanRequestDTO.ts";
import User from "../../domain/entities/admin/User";
import { IGetGymsResponseDTO } from "../../domain/dtos/admin/IGetGymsResponseDTO.ts";
import { IGetMembershipPlansResponseDTO } from "../../domain/dtos/admin/IGetMembershipPlansResponseDTO.ts";
import { IGetTrainersResponseDTO } from "../../domain/dtos/admin/IGetTrainersResponseDTO.ts";
import { PendingTrainerSummary } from "../../domain/entities/admin/Trainer.ts";



export interface GetUsersResponse {
  users: User[];
  totalPages: number;
}

export interface IGetPendingTrainersResponseDTO {
  trainers: PendingTrainerSummary[];
  totalPages: number;
  totalPending: number;
}

export interface IAdminRepository {
  login(data: IAdminLoginRequestDTO): Promise<IAdminLoginResponseDTO>;
  logout(email: string): Promise<void>;
  getUsers(page: number, limit: number, search?: string, status?: string, membership?: string, isVerified?: string): Promise<GetUsersResponse>;
  toggleUserVerification(userId: string): Promise<User>;
  addGym(data: FormData): Promise<any>;
  getAvailableTrainers(): Promise<{ id: string; name: string; active: boolean }[]>;
  getGyms(page: number, limit: number): Promise<IGetGymsResponseDTO>;
  getTrainers(
    page: number,
    limit: number,
    search?: string,
    status?: string,
    specialization?: string,
    isVerified?: string
  ): Promise<IGetTrainersResponseDTO>;
  addMembershipPlan(data: IAddMembershipPlanRequestDTO): Promise<any>;
  getMembershipPlans(page: number, limit: number): Promise<IGetMembershipPlansResponseDTO>;
  getPendingTrainers(page: number, limit: number): Promise<IGetPendingTrainersResponseDTO>;
  approveTrainer(trainerId: string): Promise<void>;
  getTrainerDetails(trainerId: string): Promise<any>;
}