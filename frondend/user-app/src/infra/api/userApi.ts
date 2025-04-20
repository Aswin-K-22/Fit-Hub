/* eslint-disable @typescript-eslint/no-explicit-any */
// src/infra/api/userApi.ts
import axios, { AxiosError } from "axios";
import { MembershipPlan } from "../../domain/entities/common/MembershipPlan";
import { IUserRepository } from "../../app/repositories/IUserRepository";
import { ILoginRequestDTO } from "../../domain/dtos/user/ILoginRequestDTO";
import { ILoginResponseDTO } from "../../domain/dtos/user/ILoginResponseDTO";
import { ISignupRequestDTO } from "../../domain/dtos/user/ISignupRequestDTO";
import { IMembershipPlansRequestDTO } from "../../domain/dtos/common/IMembershipPlansRequestDTO";
import { IMembershipPlansResponseDTO } from "../../domain/dtos/user/IMembershipPlansResponseDTO";
import { IGymSearchDTO } from "../../domain/dtos/user/IGymSearchDTO";
import { Gym } from "../../domain/entities/common/Gym";
import { IUserProfileResponseDTO } from "../../domain/dtos/user/IUserProfileResponseDTO";
import { IUpdateUserProfileRequestDTO } from "../../domain/dtos/user/IUpdateUserProfileRequestDTO";
import { IVerifyOtpRequestDTO } from "../../domain/dtos/common/VerifyOtpRequestDTO";
import { IVerifyOtpResponseDTO } from "../../domain/dtos/common/IVerifyOtpResponseDTO";
import { IResendOtpRequestDTO } from "../../domain/dtos/common/IResendOtpRequestDTO";
import { IGoogleAuthRequestDTO } from "../../domain/dtos/user/IGoogleAuthRequestDTO";
import { IGoogleAuthResponseDTO } from "../../domain/dtos/user/IGoogleAuthResponseDTO";
import { IGymDetailsDTO } from "../../domain/dtos/user/IGymDetailsDTO";
import { UserAuth } from "@/domain/entities/common/UserAuth";

const apiClient = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

let isRefreshing = false;
let failedQueue: Array<{ resolve: (value: any) => void; reject: (reason?: any) => void }> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh-token")
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => apiClient(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
         await apiClient.post("/auth/refresh-token");
        processQueue(null);
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

// User Authentication
export const login = async (email: string, password: string): Promise<{ user: UserAuth }> => {
  const response = await apiClient.post("/auth/login", { email, password });
  return { user: response.data.user };
};

export const signup = async (name: string, email: string, password: string): Promise<void> => {
  // [Change 1 - Line 83]: Updated to Promise<void> to match backend
  await apiClient.post("/auth/signup", { name, email, password });
};

export const googleAuth = async (data: IGoogleAuthRequestDTO): Promise<IGoogleAuthResponseDTO> => {
  console.log("Sending Google auth request with data:", data);
  const response = await apiClient.post("/auth/google", data);
  console.log("Google auth response:", response.data);
  return response.data;
};

export const verifyOtp = async (data: IVerifyOtpRequestDTO): Promise<IVerifyOtpResponseDTO> => {
  const response = await apiClient.post("/auth/verify-otp", data);
  return response.data;
};

export const resendOtp = async (data: IResendOtpRequestDTO): Promise<void> => {
  await apiClient.post("/auth/resend-otp", data);
};

export const logout = async (email: string): Promise<void> => {
  // [Change 2 - Line 100]: Updated to Promise<void> to match backend
  await apiClient.post("/user/logout", { email });
};

export const getUser = async (): Promise<{ user: UserAuth }> => {
  const response = await apiClient.get("/auth/user");
  return { user: response.data.user };
};

export const getUserProfile = async (): Promise<IUserProfileResponseDTO> => {
  const response = await apiClient.get("/auth/user/profile");
  return response.data;
};

export const updateUserProfile = async (data: { name?: string; profilePic?: File }): Promise<IUserProfileResponseDTO> => {
  const formData = new FormData();
  if (data.name) formData.append("name", data.name);
  if (data.profilePic) formData.append("profilePic", data.profilePic);
  const response = await apiClient.put("/auth/user/profile", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const fetchGyms = async (
  page: number,
  limit: number,
  filters: { search?: string; lat?: number; lng?: number; radius?: number; gymType?: string; rating?: string }
): Promise<{ gyms: Gym[]; totalPages: number; totalGyms: number }> => {
  const response = await apiClient.get("/user/gyms", { params: { page, limit, ...filters } });
  return response.data;
};

export const forgotPassword = async (email: string): Promise<void> => {
  await apiClient.post("/auth/forgot-password", { email });
};

export const resetPassword = async (email: string, otp: string, newPassword: string): Promise<void> => {
  await apiClient.post("/auth/reset-password", { email, otp, newPassword });
};

export const verifyForgotPasswordOtp = async (data: IVerifyOtpRequestDTO): Promise<void> => {
  await apiClient.post("/auth/verify-forgot-password-otp", data);
};

export const getMembershipPlansUser = async (page: number = 1, limit: number = 3): Promise<{ plans: MembershipPlan[]; total: number }> => {
  const response = await apiClient.get("/user/membership-plans", { params: { page, limit } });
  return response.data;
};

export const subscribeToPlan = async (planId: string): Promise<{ orderId: string; amount: number; currency: string }> => {
  const response = await apiClient.post("/membership/subscribe", { planId });
  return response.data;
};

export const verifyPayment = async (data: {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
  planId: string;
}): Promise<void> => {
  await apiClient.post("/membership/verify-payment", data);
};

export const fetchGymDetails = async (gymId: string): Promise<IGymDetailsDTO> => {
  const response = await apiClient.get(`/user/gyms/${gymId}`);
  return response.data.data;
};

/////////////////////////////////////////////////////////////////////////////////

export class UserRepository implements IUserRepository {
  async login(data: ILoginRequestDTO): Promise<ILoginResponseDTO> {
    return login(data.email, data.password);
  }

  async signup(data: ISignupRequestDTO): Promise<void> {
    return signup(data.name, data.email, data.password);
  }

  async googleAuth(data: IGoogleAuthRequestDTO): Promise<IGoogleAuthResponseDTO> {
    return googleAuth(data);
  }

  async logout(email: string): Promise<void> {
    return logout(email);
  }

  async fetchGyms(params: IGymSearchDTO): Promise<{ gyms: Gym[]; totalPages: number; totalGyms: number }> {
    return fetchGyms(params.page, params.limit, {
      search: params.search,
      lat: params.lat,
      lng: params.lng,
      radius: params.radius,
      gymType: params.gymType,
      rating: params.rating,
    });
  }
  async getMembershipPlans(params: IMembershipPlansRequestDTO): Promise<IMembershipPlansResponseDTO> {
    return getMembershipPlansUser(params.page, params.limit);
  }
  async getUserProfile(): Promise<IUserProfileResponseDTO> {
    return getUserProfile();
  }

  async updateUserProfile(data: IUpdateUserProfileRequestDTO): Promise<IUserProfileResponseDTO> {
    return updateUserProfile(data);
  }

  async forgotPassword(email: string): Promise<void> {
    return forgotPassword(email);
  }

  async resetPassword(email: string, otp: string, newPassword: string): Promise<void> {
    return resetPassword(email, otp, newPassword);
  }
  async verifyOtp(data: IVerifyOtpRequestDTO): Promise<IVerifyOtpResponseDTO> {
    return verifyOtp(data);
  }
  async resendOtp(data: IResendOtpRequestDTO): Promise<void> {
    await resendOtp(data);
  }
  async verifyForgotPasswordOtp(data: IVerifyOtpRequestDTO): Promise<void> {
    await verifyForgotPasswordOtp(data);
  }

  async subscribeToPlan(planId: string): Promise<{ orderId: string; amount: number; currency: string }> {
    return subscribeToPlan(planId);
  }

  async verifyPayment(data: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
    planId: string;
  }): Promise<void> {
    return verifyPayment(data);
  }

  async fetchGymDetails(gymId: string): Promise<IGymDetailsDTO> {
    return fetchGymDetails(gymId);
  }
}