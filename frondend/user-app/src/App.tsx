// src/App.tsx
import React, { JSX, useEffect, Suspense } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useSelector } from "react-redux";
import ErrorBoundary from "@/presentation/components/ErrorBoundary";
import { RootState } from "@/infra/redux/store";
import UserLayout from "@/presentation/layouts/UserLayout";
import { useAuthSession } from "@/infra/hooks/useAuthSession"; // [Change 1 - Line 10]: Import useAuthSession

// Lazy-loaded components
const LandingPage = React.lazy(() => import("@/presentation/features/user/pages/LandingPage"));
const GoogleCallback = React.lazy(() => import("@/presentation/features/user/pages/GoogleCallback"));
const GymSearchPage = React.lazy(() => import("@/presentation/features/user/pages/GymSearchPage"));
const MembershipPage = React.lazy(() => import("@/presentation/features/user/pages/MembershipPage"));
const UserProfile = React.lazy(() => import("@/presentation/features/user/pages/UserProfile"));
const LoginSignup = React.lazy(() => import("@/presentation/features/user/pages/LoginSignup"));
const VerifyOtp = React.lazy(() => import("@/presentation/features/auth/pages/VerifyOtp"));
const ResetPassword = React.lazy(() => import("@/presentation/features/auth/pages/ResetPassword"));
const ForgotPassword = React.lazy(() => import("@/presentation/features/auth/pages/ForgotPassword"));
const PaymentSuccess = React.lazy(() => import("@/presentation/features/user/pages/PaymentSuccess"));
const PaymentFailed = React.lazy(() => import("@/presentation/features/user/pages/PaymentFailed"));
const ForbiddenPage = React.lazy(() => import("@/presentation/features/auth/pages/ForbiddenPage"));
import GymDetailsPage from "@/presentation/features/user/pages/GymDetailsPage";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const ProtectedRoute: React.FC<{ element: JSX.Element; allowedRoles: string[]; isPublic?: boolean }> = ({
  element,
  allowedRoles,
  isPublic = false,
}) => {
  const { isAuthenticated, user, isLoading } = useSelector((state: RootState) => state.auth); // [Change 2 - Line 31]: Add isLoading
  const location = useLocation();
  const navigate = useNavigate();
  const userRole = user?.role || "";

  useEffect(() => {
    if (!isAuthenticated && !isPublic && !location.pathname.includes("auth") && !isLoading) {
      navigate("/auth", { replace: true, state: { from: location } });
    }
    if (isAuthenticated && !allowedRoles.includes(userRole) && !isLoading) {
      navigate("/forbidden", { replace: true });
    }
  }, [isAuthenticated, location, navigate, isPublic, userRole, isLoading]);

  if (isLoading) return <div>Loading...</div>; 
  if (!isAuthenticated && isPublic) return element;
  if (!isAuthenticated) return null;
  if (!allowedRoles.includes(userRole)) return <ForbiddenPage />;
  return element;
};

const App: React.FC = () => {
  useAuthSession(); 

  return (
    <div className="min-h-screen bg-gray-100">
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <ErrorBoundary>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route element={<UserLayout />}>
                <Route path="/" element={<ProtectedRoute element={<LandingPage />} allowedRoles={["user","admin","trainer"]} isPublic={true} />} />
                <Route path="/gyms" element={<ProtectedRoute element={<GymSearchPage />} allowedRoles={["user"]} isPublic={true} />} />
                <Route path="/gyms/:gymId" element={<GymDetailsPage />} />
                <Route path="/membership" element={<ProtectedRoute element={<MembershipPage />} allowedRoles={["user"]} isPublic={true} />} />
                <Route path="/profile" element={<ProtectedRoute element={<UserProfile />} allowedRoles={["user"]} />} />
                <Route path="/auth" element={<LoginSignup />} />
                <Route path="/auth/google/callback" element={<GoogleCallback />} />
                <Route path="/verify-otp" element={<VerifyOtp />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/payment-success" element={<ProtectedRoute element={<PaymentSuccess />} allowedRoles={["user"]} />} />
                <Route path="/payment-failed" element={<ProtectedRoute element={<PaymentFailed />} allowedRoles={["user"]} />} />
                <Route path="/forbidden" element={<ForbiddenPage />} />
                <Route path="*" element={<LandingPage />} />
              </Route>
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </GoogleOAuthProvider>
      <ToastContainer />
    </div>
  );
};

export default App;