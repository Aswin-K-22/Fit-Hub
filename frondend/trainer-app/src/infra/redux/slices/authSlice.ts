import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserAuth } from "../../../domain/entities/common/UserAuth";



interface AuthState {
  user: UserAuth | null;
  isAuthenticated: boolean;
}

const loadStateFromLocalStorage = (): AuthState => {
  const savedState = localStorage.getItem("authState");
  return savedState
    ? JSON.parse(savedState)
    : { user: null, isAuthenticated: false };
};

const initialState: AuthState = loadStateFromLocalStorage();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<UserAuth>) {
      state.user = {
        ...action.payload,
        verifiedByAdmin: action.payload.verifiedByAdmin ?? false,
        isVerified: action.payload.isVerified ?? false, 
      };
      state.isAuthenticated = true;
      localStorage.setItem("authState", JSON.stringify(state));
    },
    signup(state, action: PayloadAction<UserAuth>) {
      state.user = {
        ...action.payload,
        verifiedByAdmin: action.payload.verifiedByAdmin ?? false, 
        isVerified: action.payload.isVerified ?? false, 
      };
      state.isAuthenticated = true; 
      localStorage.setItem("authState", JSON.stringify(state));
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("authState");
    },
    updateVerificationStatus(
      state,
      action: PayloadAction<{ isVerified?: boolean; verifiedByAdmin?: boolean }>
    ) {
      if (state.user) {
        state.user = {
          ...state.user,
          isVerified: action.payload.isVerified ?? state.user.isVerified,
          verifiedByAdmin: action.payload.verifiedByAdmin ?? state.user.verifiedByAdmin,
        };
        localStorage.setItem("authState", JSON.stringify(state));
      }
    }
  },
});

export const { login, signup, logout, updateVerificationStatus } = authSlice.actions;
export default authSlice.reducer;