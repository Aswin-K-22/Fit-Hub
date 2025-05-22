/* eslint-disable @typescript-eslint/no-explicit-any */
// src/infra/redux/slices/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { TrainerAuth } from "@/domain/entities/common/UserAuth";
import { trainerLogout as logoutApi, TrainerRepository } from "@/infra/api/trainerApi";
import { ITrainerLoginRequestDTO } from "@/domain/dtos/trainer/ITrainerLoginRequestDTO";
import { LoginTrainerUseCase } from "@/app/useCases/trainer/loginTrainer";

const trainerRepository = new TrainerRepository();
const loginTrainerUseCase = new LoginTrainerUseCase(trainerRepository);


interface AuthState {
  trainer: TrainerAuth | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  trainer: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};


export const loginThunk = createAsyncThunk(
  "auth/trainerLogin",
  async (data: ITrainerLoginRequestDTO, { rejectWithValue }) => {
    try {
      const response = await loginTrainerUseCase.execute(data);
      return response.trainer;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);


export const logoutThunk = createAsyncThunk(
  "auth/trainerLogout",
  async (email: string, { rejectWithValue }) => {
    try {
      await logoutApi(email);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<{ trainer: TrainerAuth | null; isAuthenticated: boolean }>) {
      state.trainer = action.payload.trainer;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.isLoading = false;
      state.error = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.trainer = {
          ...action.payload,
          isVerified: action.payload.isVerified ?? false,
        };
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.trainer = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setAuth, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;