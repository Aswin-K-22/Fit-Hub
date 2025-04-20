/* eslint-disable @typescript-eslint/no-explicit-any */
// src/infra/hooks/useAuthSession.ts
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/infra/redux/store";
import { setAuth, setLoading, setError } from "@/infra/redux/slices/authSlice";
import { getUser } from "@/infra/api/userApi";

export const useAuthSession = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const checkAuth = async () => {
      dispatch(setLoading(true));
      try {
        const response = await getUser();
        if(response.user.role == "user"){
          dispatch(setAuth({ user: response.user, isAuthenticated: true }));
        }else{
        dispatch(setAuth({ user: null, isAuthenticated: false }));
}
    
      } catch (error: any) {
        dispatch(setError(error.response?.data?.message || "Failed to verify session"));
        dispatch(setAuth({ user: null, isAuthenticated: false }));
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (!isAuthenticated && !isLoading) {
      checkAuth();
    }
  }, [dispatch]);

  return { isAuthenticated, isLoading };
};