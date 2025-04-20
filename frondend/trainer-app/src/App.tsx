import React, { JSX, useEffect, Suspense } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ErrorBoundary from "@/presentation/components/ErrorBoundary";
import { RootState } from "@/infra/redux/store";
import { useAuthSession } from "@/infra/hooks/useAuthSession";
import TrainerLayout from "@/presentation/layouts/TrainerLayout";

// Lazy-loaded components
const TrainerDashboard = React.lazy(() => import("@/presentation/features/trainer/pages/TrainerDashboard"));
const TrainerProfile = React.lazy(() => import("@/presentation/features/trainer/pages/TrainerProfile"));
const TrainerLogin = React.lazy(() => import("@/presentation/features/trainer/pages/TrainerLogin"));
const TrainerSignup = React.lazy(() => import("@/presentation/features/trainer/pages/TrainerSignup"));
const TrainerVerifyOtp = React.lazy(() => import("@/presentation/features/trainer/pages/TrainerVerifyOtp"));
const PendingApproval = React.lazy(() => import("@/presentation/features/trainer/pages/PendingApproval"));
const ForbiddenPage = React.lazy(() => import("@/presentation/features/auth/pages/ForbiddenPage"));

const ProtectedRoute: React.FC<{ element: JSX.Element; allowedRoles: string[]; isPublic?: boolean }> = ({
  element,
  allowedRoles,
  isPublic = false,
}) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const userRole = user?.role || "";
  const isTrainerApproved = user?.verifiedByAdmin || false;

  useEffect(() => {
    if (!isAuthenticated && !isPublic && !location.pathname.includes("login")) {
      navigate("/trainer/login", { replace: true, state: { from: location } });
    }
    if (
      isAuthenticated &&
      userRole === "trainer" &&
      !isTrainerApproved &&
      !location.pathname.includes("/trainer/pending-approval") &&
      !location.pathname.includes("/trainer/verify-otp") &&
      !location.pathname.includes("/trainer/signup")
    ) {
      navigate("/trainer/pending-approval", { replace: true });
    }
    if (isAuthenticated && !allowedRoles.includes(userRole)) {
      navigate("/forbidden", { replace: true });
    }
  }, [isAuthenticated, location, navigate, isPublic, userRole, isTrainerApproved]);

  if (!isAuthenticated && isPublic) return element;
  if (!isAuthenticated) return null;
  if (!allowedRoles.includes(userRole)) return <ForbiddenPage />;
  return element;
};

const App: React.FC = () => {
  useAuthSession();

  return (
    <div className="min-h-screen bg-gray-100">
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route element={<TrainerLayout />}>
              <Route path="/dashboard" element={<ProtectedRoute element={<TrainerDashboard />} allowedRoles={["trainer"]} />} />
              <Route path="/profile" element={<ProtectedRoute element={<TrainerProfile />} allowedRoles={["trainer"]} />} />
            </Route>
            <Route path="/login" element={<TrainerLogin />} />
            <Route path="/signup" element={<TrainerSignup />} />
            <Route path="/verify-otp" element={<TrainerVerifyOtp />} />
            <Route path="/pending-approval" element={<PendingApproval />} />
            <Route path="/forbidden" element={<ForbiddenPage />} />
            <Route path="*" element={<TrainerLogin />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default App;