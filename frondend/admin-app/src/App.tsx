import React, { JSX, useEffect, Suspense } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ErrorBoundary from "@/presentation/components/ErrorBoundary";
import { RootState } from "@/infra/redux/store";
import { useAuthSession } from "@/infra/hooks/useAuthSession";
import AdminLayout from "@/presentation/layouts/AdminLayout";

// Lazy-loaded components
const UserManagement = React.lazy(() => import("@/presentation/features/admin/pages/UserManagement"));
const DashboardView = React.lazy(() => import("@/presentation/features/admin/pages/DashboardView"));
const Reports = React.lazy(() => import("@/presentation/features/admin/pages/Reports"));
const Trainers = React.lazy(() => import("@/presentation/features/admin/pages/TrainersManagement"));
const Gyms = React.lazy(() => import("@/presentation/features/admin/pages/Gyms"));
const AddGymForm = React.lazy(() => import("@/presentation/features/admin/pages/AddGymForm"));
const MembershipPlans = React.lazy(() => import("@/presentation/features/admin/pages/MembershipPlans"));
const AddMembershipPlan = React.lazy(() => import("@/presentation/features/admin/pages/AddMembershipPlan"));
const AdminLogin = React.lazy(() => import("@/presentation/features/admin/pages/AdminLogin"));
const TrainerDetails = React.lazy(() => import("@/presentation/features/admin/pages/TrainerDetails"));
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

  useEffect(() => {
    if (!isAuthenticated && !isPublic && !location.pathname.includes("login")) {
      navigate("/admin/login", { replace: true, state: { from: location } });
    }
    if (isAuthenticated && !allowedRoles.includes(userRole)) {
      navigate("/forbidden", { replace: true });
    }
  }, [isAuthenticated, location, navigate, isPublic, userRole]);

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
            <Route element={<AdminLayout />}>
              <Route path="/dashboard" element={<ProtectedRoute element={<DashboardView />} allowedRoles={["admin"]} />} />
              <Route path="/users" element={<ProtectedRoute element={<UserManagement />} allowedRoles={["admin"]} />} />
              <Route path="/reports" element={<ProtectedRoute element={<Reports />} allowedRoles={["admin"]} />} />
              <Route path="/trainers" element={<ProtectedRoute element={<Trainers />} allowedRoles={["admin"]} />} />
              <Route path="/trainers/:id" element={<ProtectedRoute element={<TrainerDetails />} allowedRoles={["admin"]} />} />
              <Route path="/gyms" element={<ProtectedRoute element={<Gyms />} allowedRoles={["admin"]} />} />
              <Route path="/gym/add" element={<ProtectedRoute element={<AddGymForm />} allowedRoles={["admin"]} />} />
              <Route path="/subscriptions" element={<ProtectedRoute element={<MembershipPlans />} allowedRoles={["admin"]} />} />
              <Route path="/subscriptions/add" element={<ProtectedRoute element={<AddMembershipPlan />} allowedRoles={["admin"]} />} />
            </Route>
            <Route path="/login" element={<AdminLogin />} />
            <Route path="/forbidden" element={<ForbiddenPage />} />
            <Route path="*" element={<AdminLogin />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default App;