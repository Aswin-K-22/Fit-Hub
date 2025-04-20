// src/presentation/layouts/AdminLayout.tsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "../../infra/redux/store";
import { logout as logoutAction } from "../../infra/redux/slices/authSlice";
import { logout as logoutApi } from "../../infra/api/userApi";
import Sidebar from "../features/admin/components/Sidebar";
import Header from "../features/admin/components/Header";
import { toast } from "react-toastify";
import { Outlet } from "react-router-dom"; 

export const AdminLayout: React.FC<{ children?: React.ReactNode }> = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      if (user?.email) {
        await logoutApi(user.email);
        dispatch(logoutAction());
        toast.success("Logged out successfully!");
        navigate("/admin/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed—try again!");
    }
    setIsOpen(false);
  };

  return (
    <div className="min-h-screen flex bg-gray-50 font-[Inter]">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header user={user} isOpen={isOpen} setIsOpen={setIsOpen} handleLogout={handleLogout} />
        <main>
          <Outlet /> {/* Render nested routes here */}
        </main>
      </div>
    </div>
  );
};