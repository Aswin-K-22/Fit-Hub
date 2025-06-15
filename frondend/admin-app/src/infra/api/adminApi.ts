/* eslint-disable @typescript-eslint/no-explicit-any */
// src/infra/api/adminApi.ts
import axios from "axios";
//import { IAddTrainerDataDTO } from "../../domain/dtos/trainer/IAddTrainerDataDTO";
import { GetUsersResponse, IAdminRepository, IGetPendingTrainersResponseDTO } from "../../app/repositories/IAdminRepository";
import { IAdminLoginRequestDTO } from "../../domain/dtos/admin/IAdminLoginRequestDTO";
import { IAdminLoginResponseDTO } from "../../domain/dtos/admin/IAdminLoginResponseDTO";
import { IAddMembershipPlanRequestDTO } from "../../domain/dtos/admin/IAddMembershipPlanRequestDTO.ts";
import User from "../../domain/entities/admin/User";
import { IGetGymsResponseDTO } from "../../domain/dtos/admin/IGetGymsResponseDTO.ts";
import { IGetMembershipPlansResponseDTO } from "../../domain/dtos/admin/IGetMembershipPlansResponseDTO.ts";
import { IGetTrainersResponseDTO } from "../../domain/dtos/admin/IGetTrainersResponseDTO.ts";

const apiClient = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export const adminLogin = async (email: string, password: string) => {
  try {
    console.log("adminApi: Sending login request with email:", email, "payload:", { email, password });
    const response = await apiClient.post("/auth/admin/login", { email, password });
    console.log("adminApi: Login response:", {
      status: response.status,
      data: response.data,
      admin: response.data.admin,
    });
    return { admin: response.data.admin };
  } catch (error: any) {
    console.error("adminApi: Login error:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      errorMessage: error.response?.data?.message || "Unknown error",
    });
    throw error; // Re-throw to let loginThunk handle rejectWithValue
  }
};

export const adminLogout = async (email: string): Promise<void> => {
  await apiClient.post("/admin/logout", { email });
};

export const getAdmin = async () => {
  const response = await apiClient.get("/auth/admin");
  return { admin: response.data.admin };
};

export const getUsers = async (page: number = 1, limit: number = 3): Promise<GetUsersResponse> => {
  const response = await apiClient.get("/admin/users", { params: { page, limit } });
  return {
    users: response.data.users.map((user: any) => ({
      id: user.id,
      name: user.name || "N/A",
      email: user.email,
      membership: user.membershipId ? "Premium" : "N/A", // Adjust based on backend
      status: user.isVerified ? "Active" : "Suspended",
      profilePic: user.profilePic || null,
      isVerified: user.isVerified,
    })),
    totalPages: response.data.totalPages,
  };
};

// export const addTrainer = async (data: IAddTrainerDataDTO): Promise<any> => {
//   const response = await apiClient.post("/admin/addTrainer", data);
//   return response.data;
// };

export const addGym = async (data: FormData): Promise<any> => {
  const response = await apiClient.post("/admin/addGym", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const getAvailableTrainers = async (): Promise<{ id: string; name: string; active: boolean }[]> => {
  const response = await apiClient.get("/admin/available-trainers");
  return response.data.trainers; 
};

export const getGyms = async (page: number, limit: number): Promise<IGetGymsResponseDTO>=>{
  const response = await apiClient.get(`/admin/gyms?page=${page}&limit=${limit}`);
  return response.data;
};

export const trainersList = async (page: number, limit: number) => {
  const response = await apiClient.get(`/admin/trainers?page=${page}&limit=${limit}`);
  return response.data;
};

export const toggleUserVerification = async (id: string): Promise<User> => {
  const response = await apiClient.put(`/admin/users/${id}/toggle-verification`);
  const updatedUser = response.data.user; 
  console.log("Raw backend response:", response.data); 
  return {
    id: updatedUser.id,
    email: updatedUser.email,
    role: updatedUser.role,
    name: updatedUser.name || "N/A",
    createdAt: updatedUser.createdAt || null,
    updatedAt: updatedUser.updatedAt || null,
    isVerified: updatedUser.isVerified ?? false,
    membershipId: updatedUser.membershipId || null,
    fitnessProfile: updatedUser.fitnessProfile || null,
    workoutPlanId: updatedUser.workoutPlanId || null,
    progress: updatedUser.progress || null,
    weeklySummary: updatedUser.weeklySummary || null,
    profilePic: updatedUser.profilePic || null,
    status: updatedUser.status || (updatedUser.isVerified ? "Active" : "Suspended"),
    membership: updatedUser.membership || (updatedUser.membershipId ? "Premium" : "N/A"),
  };
};

export const getMembershipPlans = async (page: number, limit: number): Promise<IGetMembershipPlansResponseDTO> => {
  const response = await apiClient.get("/admin/subscriptions", {
    params: { page, limit },
  });
  return response.data;
};

export const addMembershipPlan = async (data: IAddMembershipPlanRequestDTO):Promise<any> => {
  const response = await apiClient.post("/admin/membership-plans", data);
  return response.data;
};


export const getPendingTrainers = async (page: number, limit: number): Promise<IGetPendingTrainersResponseDTO> => {
  const response = await apiClient.get(`/admin/pending-trainers?page=${page}&limit=${limit}`);
  return response.data;
};

export const getTrainers = async (page: number, limit: number, status?: string): Promise<IGetTrainersResponseDTO> => {
  const response = await apiClient.get(`/admin/trainers`, { params: { page, limit, status } });
  return response.data;
};

export class AdminRepository implements IAdminRepository {
  async login(data: IAdminLoginRequestDTO): Promise<IAdminLoginResponseDTO> {
    return adminLogin(data.email, data.password);
  }

  async logout(email: string): Promise<void> {
    return adminLogout(email);
  }

  async getUsers(page: number, limit: number): Promise<GetUsersResponse> {
    return getUsers(page, limit);
  }

  async toggleUserVerification(userId: string): Promise<User> {
    return toggleUserVerification(userId);
  }

  // async addTrainer(data: IAddTrainerDataDTO): Promise<any> {
  //   return addTrainer(data);
  // }



  async getGyms(page: number, limit: number): Promise<IGetGymsResponseDTO> {
    return getGyms(page, limit);
  }


  async addGym(data: FormData): Promise<any> {
    return addGym(data);
  }

  async getAvailableTrainers(): Promise<{ id: string; name: string; active: boolean }[]> {
    return getAvailableTrainers();
  }
  async addMembershipPlan(data: IAddMembershipPlanRequestDTO): Promise<any> {
    return addMembershipPlan(data);
  }
  async getMembershipPlans(page: number, limit: number): Promise<IGetMembershipPlansResponseDTO> {
    return getMembershipPlans(page, limit);
  }


  async getTrainerDetails(trainerId: string): Promise<any> {
    const response = await apiClient.get(`/admin/trainers/${trainerId}`);
    return response.data;
  }
  async getPendingTrainers(page: number, limit: number): Promise<IGetPendingTrainersResponseDTO> {
    return getPendingTrainers(page, limit);
  }

  async getTrainers(page: number, limit: number, status?: string): Promise<IGetTrainersResponseDTO> {
    return getTrainers(page, limit, status);
  }

  async approveTrainer(trainerId: string): Promise<void> {
    await apiClient.put(`/admin/trainers/${trainerId}/toggle-approval`);
  }
  
}