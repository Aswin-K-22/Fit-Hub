// src/infra/api/trainerApi.ts
import axios from "axios";
import { TrainerProfileData } from "../../domain/entities/trainer/Trainer";
import { ITrainerRepository } from "../../app/repositories/ITrainerRepository";
import { ITrainerLoginRequestDTO } from "../../domain/dtos/trainer/ITrainerLoginRequestDTO";
import { ITrainerProfileResponseDTO } from "../../domain/dtos/trainer/ITrainerProfileResponseDTO";
import { IUpdateTrainerProfileRequestDTO } from "../../domain/dtos/trainer/IUpdateTrainerProfileRequestDTO";
import { ITrainerDashboardResponseDTO } from "../../domain/dtos/trainer/ITrainerDashboardResponseDTO";
import { IVerifyOtpRequestDTO } from "../../domain/dtos/common/VerifyOtpRequestDTO";
import { IResendOtpRequestDTO } from "../../domain/dtos/common/IResendOtpRequestDTO";
import { ITrainerSignupRequestDTO } from "../../domain/dtos/trainer/ITrainerSignupRequestDTO";
import { ITrainerLoginResponseDTO } from "../../domain/dtos/trainer/ITrainerLoginResponseDTO";

const apiClient = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export const trainerLogin = async (email: string, password: string): Promise<ITrainerLoginResponseDTO> => {
  const response = await apiClient.post("/auth/trainer/login", { email, password });
  return response.data;
};

export const signupTrainer = async (data: ITrainerSignupRequestDTO) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("password", data.password);
  formData.append("experienceLevel", data.experienceLevel);
  formData.append("specialties", JSON.stringify(data.specialties));
  formData.append("bio", data.bio);
  data.certifications.forEach((cert, index) => {
    formData.append(`certifications[${index}][name]`, cert.name);
    formData.append(`certifications[${index}][issuer]`, cert.issuer);
    formData.append(`certifications[${index}][dateEarned]`, cert.dateEarned);
    formData.append(`certifications[${index}][file]`, cert.file);
  });

  const response = await apiClient.post("/auth/trainer/signup", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const verifyTrainerOtp = async (data: IVerifyOtpRequestDTO): Promise<void> => {
  const response = await apiClient.post("/auth/trainer/verify-otp", data);
  return response.data;
};
export const getTrainer = async () => {
  const response = await apiClient.get("/auth/trainer", { withCredentials: true });
  return { trainer : response.data.trainer };
};

export const resendTrainerOtp = async (data: IResendOtpRequestDTO): Promise<void> => {
  await apiClient.post("/auth/trainer/resend-otp", data);
};

export const trainerLogout = async (email: string) => {
  const response = await apiClient.post("/trainer/logout", { email });
  return response.data;
};

export const getTrainerProfile = async (): Promise<{ trainer: TrainerProfileData }> => {
  const response = await apiClient.get("/trainer/profile");
  return response.data;
};

export const updateTrainerProfile = async (data: IUpdateTrainerProfileRequestDTO) => {
  const formData = new FormData();
  if (data.name) formData.append("name", data.name);
  if (data.bio) formData.append("bio", data.bio);
  if (data.specialties) formData.append("specialties", JSON.stringify(data.specialties));
  if (data.profilePic) formData.append("profilePic", data.profilePic);
  if (data.upiId) formData.append("upiId", data.upiId);
  if (data.bankAccount) formData.append("bankAccount", data.bankAccount);
  if (data.ifscCode) formData.append("ifscCode", data.ifscCode);
  const response = await apiClient.put("/trainer/profile", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const getTrainerDashboardData = async (): Promise<ITrainerDashboardResponseDTO> => {
  // Mock data for now; replace with real API call
  return {
    stats: { todaysSessions: "8", activeClients: "24", monthlyEarnings: "$4,250", averageRating: "4.9" },
    sessions: [
      {
        name: "Sarah Johnson",
        type: "Strength Training",
        time: "9:00 AM - 10:00 AM",
        avatar: "https://creatie.ai/ai/api/search-image?query=A%20professional%20headshot%20of%20a%20young%20woman%20in%20athletic%20wear,%20looking%20confident%20and%20energetic,%20against%20a%20clean%20studio%20background.%20The%20image%20should%20convey%20fitness%20and%20wellness.&width=200&height=200&orientation=squarish&flag=1a5a83ba-75bd-4237-b15a-187f1f4e9d05",
      },
      {
        name: "David Miller",
        type: "HIIT Workout",
        time: "10:30 AM - 11:30 AM",
        avatar: "https://creatie.ai/ai/api/search-image?query=A%20professional%20headshot%20of%20a%20middle-aged%20man%20in%20fitness%20attire,%20showing%20a%20determined%20expression,%20against%20a%20neutral%20background.%20The%20image%20should%20reflect%20dedication%20to%20fitness.&width=200&height=200&orientation=squarish&flag=93b9c1da-1a95-4b1b-94ae-a84013218191",
      },
    ],
    notifications: [
      { icon: "fa-bell", text: "New booking request from Emma Wilson", time: "5 minutes ago", color: "text-indigo-600" },
      { icon: "fa-check", text: "Session completed with John Davis", time: "1 hour ago", color: "text-green-600" },
    ],
    chats: [
      { name: "Sarah Johnson", status: "Online", avatar: "https://creatie.ai/ai/api/search-image?query=A%20professional%20headshot%20of%20a%20young%20woman%20in%20athletic%20wear,%20looking%20confident%20and%20energetic,%20against%20a%20clean%20studio%20background.%20The%20image%20should%20convey%20fitness%20and%20wellness.&width=200&height=200&orientation=squarish&flag=1a5a83ba-75bd-4237-b15a-187f1f4e9d05" },
      { name: "David Miller", status: "Last seen 5m ago", avatar: "https://creatie.ai/ai/api/search-image?query=A%20professional%20headshot%20of%20a%20middle-aged%20man%20in%20fitness%20attire,%20showing%20a%20determined%20expression,%20against%20a%20neutral%20background.%20The%20image%20should%20reflect%20dedication%20to%20fitness.&width=200&height=200&orientation=squarish&flag=93b9c1da-1a95-4b1b-94ae-a84013218191" },
    ],
    performance: {
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      sessions: [5, 7, 6, 8, 9, 6, 4],
      revenue: [250, 350, 300, 400, 450, 300, 200],
    },
  };
  // Uncomment for real API call:
  // const response = await apiClient.get("/trainer/dashboard");
  // return response.data;
};

export class TrainerRepository implements ITrainerRepository {
  checkApprovalStatus(): Promise<{ isApproved: boolean; }> {
    throw new Error("Method not implemented.");
  }

  async login(data: ITrainerLoginRequestDTO): Promise<ITrainerLoginResponseDTO> {
    return trainerLogin(data.email, data.password);
  }

  async signupTrainer(data: ITrainerSignupRequestDTO): Promise<void> {
    return signupTrainer(data);
  }
  async logout(email: string): Promise<void> {
    return trainerLogout(email);
  }

  async getTrainerProfile(): Promise<ITrainerProfileResponseDTO> {
    return getTrainerProfile();
  }

  async updateTrainerProfile(data: IUpdateTrainerProfileRequestDTO): Promise<ITrainerProfileResponseDTO> {
    return updateTrainerProfile(data);
  }
  async getDashboardData(): Promise<ITrainerDashboardResponseDTO> {
    return getTrainerDashboardData();
  }

  async verifyTrainerOtp(data: IVerifyOtpRequestDTO): Promise<void> {
    return verifyTrainerOtp(data);
  }
  async resendTrainerOtp(data: IResendOtpRequestDTO): Promise<void> {
    await resendTrainerOtp(data);
  }
}