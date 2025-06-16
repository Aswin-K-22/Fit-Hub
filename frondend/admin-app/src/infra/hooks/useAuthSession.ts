/* eslint-disable @typescript-eslint/no-explicit-any */
// src/infra/hooks/useAuthSession.ts
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/infra/redux/store";
import { setAuth, setLoading, setError } from "@/infra/redux/slices/authSlice";
import { getAdmin } from "@/infra/api/adminApi";

export const useAuthSession = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const checkAuth = async () => {
      console.log("checkAuth: Starting session check");
      dispatch(setLoading(true));
      try {
        const response = await getAdmin();
        if (response.admin && response.admin.role === "admin") {
          dispatch(setAuth({ admin: response.admin, isAuthenticated: true }));
        } else {
          dispatch(setAuth({ admin: null, isAuthenticated: false }));
        }
      } catch (error: any) {
        dispatch(setError(error.response?.data?.message || "Failed to verify session"));
        dispatch(setAuth({ admin: null, isAuthenticated: false }));
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (!isLoading && !isAuthenticated) {
      checkAuth();
    }
  }, [dispatch ,isAuthenticated]); 

  return { isAuthenticated, isLoading };
};