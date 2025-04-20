// src/presentation/features/admin/pages/TrainerManagement.tsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import StatCard from "../components/StatCard";
import { Trainer } from "../../../../domain/entities/admin/Trainer";
import { AdminRepository } from "../../../../infra/api/adminApi";
import { GetTrainersUseCase } from "../../../../app/useCases/admin/getTrainers";
import { ApproveTrainerUseCase } from "../../../../app/useCases/admin/approveTrainer";

const adminRepository = new AdminRepository();
const getTrainersUseCase = new GetTrainersUseCase(adminRepository);
const approveTrainerUseCase = new ApproveTrainerUseCase(adminRepository);

const TrainerManagement: React.FC = () => {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [stats, setStats] = useState({
    totalTrainers: 0,
    pendingApproval: 0,
    activeTrainers: 0,
    suspended: 0,
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const limit = 3;
  const backendUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
  const defaultProfilePic = "/images/user.jpg";

  useEffect(() => {
    const fetchTrainers = async () => {
      setLoading(true);
      try {
        const status = statusFilter === "All" ? undefined : statusFilter;
        const response = await getTrainersUseCase.execute(page, limit, status);
        setTrainers(response.trainers);
        setStats(response.stats);
        setTotalPages(response.totalPages);
        setError(null);
      } catch (error) {
        console.error("Trainer management admin side error: ", error);
        setError("Failed to load trainers");
        setStats(staticStats);
        setTotalPages(1);
        toast.error("Failed to load trainers");
      } finally {
        setLoading(false);
      }
    };
    fetchTrainers();
  }, [page, statusFilter]);

  const staticStats = {
    totalTrainers: 248,
    pendingApproval: 12,
    activeTrainers: 189,
    suspended: 0,
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
    setPage(1); // Reset to first page on filter change
  };

  const handleToggleApproval = async (trainerId: string, currentStatus: boolean) => {
    try {
      await approveTrainerUseCase.execute(trainerId); // Toggles status
      toast.success(`Trainer ${currentStatus ? "unapproved" : "approved"} successfully!`);
      const status = statusFilter === "All" ? undefined : statusFilter;
      const response = await getTrainersUseCase.execute(page, limit, status);
      setTrainers(response.trainers);
      setStats(response.stats);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Error toggling trainer approval:", error);
      toast.error(`Failed to ${currentStatus ? "unapprove" : "approve"} trainer`);
    }
  };

  const filteredTrainers = trainers.filter((trainer) =>
    trainer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trainer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center py-4">{error} (Showing fallback data)</div>;

  return (
    <main className="max-w-8xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Trainer Management</h1>
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-4">
          <StatCard title="Total Trainers" value={stats.totalTrainers} icon="fas fa-users" bgColor="bg-custom bg-opacity-10" textColor="text-custom" />
          <StatCard title="Pending Approval" value={stats.pendingApproval} icon="fas fa-clock" bgColor="bg-yellow-100" textColor="text-yellow-600" />
          <StatCard title="Active Trainers" value={stats.activeTrainers} icon="fas fa-check-circle" bgColor="bg-green-100" textColor="text-green-600" />
          <StatCard title="Suspended" value={stats.suspended} icon="fas fa-ban" bgColor="bg-red-100" textColor="text-red-600" />
        </div>
      </div>

      <div className="bg-white shadow rounded-lg mb-8">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1 min-w-0">
              <div className="relative rounded-md shadow-sm max-w-lg">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-search text-gray-400"></i>
                </div>
                <input
                  type="text"
                  className="focus:ring-custom focus:border-custom block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Search trainers..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-4 flex items-center space-x-3">
              <select
                value={statusFilter}
                onChange={handleStatusFilterChange}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-custom focus:border-custom sm:text-sm rounded-md"
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
              </select>
              <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-custom focus:border-custom sm:text-sm rounded-md">
                <option>All Specializations</option>
                <option>Cardio</option>
                <option>Pilates</option>
                <option>Strength</option>
              </select>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom">
                <i className="fas fa-filter mr-2"></i> More Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trainer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialization</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTrainers.map((trainer) => (
                <tr key={trainer.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={trainer.profilePic ? `${backendUrl}${trainer.profilePic}` : defaultProfilePic}
                          alt={trainer.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{trainer.name}</div>
                        <div className="text-sm text-gray-500">{trainer.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{trainer.specialties.join(", ")}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{trainer.experienceLevel || "N/A"}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        trainer.verifiedByAdmin ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {trainer.verifiedByAdmin ? "Approved" : "Pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link to={`/admin/trainers/${trainer.id}`} className="text-indigo-600 hover:text-indigo-900 mr-3">
                      <i className="fas fa-eye"></i> View
                    </Link>
                    <button
                      onClick={() => handleToggleApproval(trainer.id, trainer.verifiedByAdmin)}
                      className={`mr-3 ${trainer.verifiedByAdmin ? "text-red-600 hover:text-red-900" : "text-green-600 hover:text-green-900"}`}
                    >
                      <i className={`fas ${trainer.verifiedByAdmin ? "fa-times" : "fa-check"}`}></i>
                      {trainer.verifiedByAdmin ? " Unapprove" : " Approve"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{(page - 1) * limit + 1}</span> to{" "}
                  <span className="font-medium">{Math.min(page * limit, stats.totalTrainers)}</span> of{" "}
                  <span className="font-medium">{stats.totalTrainers}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => handlePageChange(p)}
                      className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${
                        p === page ? "bg-custom text-white" : "bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TrainerManagement;