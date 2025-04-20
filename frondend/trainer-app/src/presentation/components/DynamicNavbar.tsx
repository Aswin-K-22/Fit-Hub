// src/presentation/components/DynamicNavbar.tsx
import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { RootState } from "../../infra/redux/store";
import UserNavbar from "../features/user/components/Navbar";
import TrainerNavbar from "../features/trainer/components/Navbar";
import AdminHeader from "../features/admin/components/Header";

const DynamicNavbar: React.FC<{ isOpen?: boolean; setIsOpen?: (open: boolean) => void }> = ({ isOpen, setIsOpen }) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  // Define public paths
  const publicPaths = ["/", "/user/gyms", "/user/membership",];

  // Use UserNavbar for public paths, regardless of role
  if (publicPaths.includes(location.pathname)) {
    return <UserNavbar />;
  }

  // Role-specific navbars for protected routes
  if (isAuthenticated) {
    switch (user?.role) {
      case "trainer":
        return <TrainerNavbar />;
      case "admin":
        return <AdminHeader isOpen={isOpen || false} setIsOpen={setIsOpen || (() => {})} />;
      case "user":
        return <UserNavbar />;
      default:
        return <UserNavbar />; // Fallback
    }
  }

  return <UserNavbar />; // Default for unauthenticated non-public routes
};

export default DynamicNavbar;