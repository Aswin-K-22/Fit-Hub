// src/presentation/features/trainer/pages/TrainerDashboard.tsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../infra/redux/store";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import SessionCard from "../components/SessionCard";
import NotificationCard from "../components/NotificationCard";
import ChatCard from "../components/ChatCard";
import ReactECharts from "echarts-for-react";
import { EChartsOption } from "echarts";
import { TrainerRepository } from "../../../../infra/api/trainerApi";
import { GetTrainerDashboardUseCase } from "../../../../app/useCases/trainer/getTrainerDashboard";
import { ITrainerDashboardResponseDTO } from "../../../../domain/dtos/trainer/ITrainerDashboardResponseDTO";

const trainerRepository = new TrainerRepository();
const getTrainerDashboardUseCase = new GetTrainerDashboardUseCase(trainerRepository);

const TrainerDashboard: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [dashboardData, setDashboardData] = useState<ITrainerDashboardResponseDTO | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await getTrainerDashboardUseCase.execute();
        setDashboardData(data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;

  const chartOption: EChartsOption = {
    animation: false,
    tooltip: { trigger: "axis" },
    legend: { data: ["Sessions", "Revenue"] },
    grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
    xAxis: { type: "category", boundaryGap: false, data: dashboardData?.performance.days || [] },
    yAxis: { type: "value" },
    series: [
      {
        name: "Sessions",
        type: "line",
        data: dashboardData?.performance.sessions || [],
        smooth: true,
        lineStyle: { color: "#4F46E5" },
        itemStyle: { color: "#4F46E5" },
      },
      {
        name: "Revenue",
        type: "line",
        data: dashboardData?.performance.revenue || [],
        smooth: true,
        lineStyle: { color: "#10B981" },
        itemStyle: { color: "#10B981" },
      },
    ],
  };

  return (
    <div className="bg-gray-50 min-h-screen font-[Inter]">
      <Navbar />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex items-center">
              <img
                className="h-20 w-20 rounded-full object-cover mr-6"
                src="https://creatie.ai/ai/api/search-image?query=A%20professional%20headshot%20of%20a%20male%20fitness%20trainer%20with%20a%20friendly%20smile,%20wearing%20athletic%20attire,%20against%20a%20neutral%20studio%20background.%20The%20image%20should%20be%20well-lit%20and%20capture%20the%20subject%27s%20confident%20and%20approachable%20demeanor.&width=200&height=200&orientation=squarish&flag=17c37b32-d20a-4129-92b3-6ac4eb738e85"
                alt="Trainer"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name || "Michael Anderson"}</h1>
                <p className="text-gray-500">Personal Trainer | Fitness Specialist</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 mb-8">
            <StatCard icon="fa-calendar-day" title="Today's Sessions" value={dashboardData?.stats.todaysSessions || "0"} />
            <StatCard icon="fa-users" title="Active Clients" value={dashboardData?.stats.activeClients || "0"} />
            <StatCard icon="fa-dollar-sign" title="Monthly Earnings" value={dashboardData?.stats.monthlyEarnings || "$0"} />
            <StatCard icon="fa-star" title="Average Rating" value={dashboardData?.stats.averageRating || "0"} />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Upcoming Sessions</h2>
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center">
                    <i className="fas fa-plus mr-2"></i> Add Session
                  </button>
                </div>
                <div className="space-y-4">
                  {dashboardData?.sessions.map((session, index) => (
                    <SessionCard key={index} {...session} />
                  ))}
                </div>
                <div className="flex justify-center mt-6">
                  <nav className="inline-flex rounded-md shadow-sm -space-x-px">
                    <button className="px-2 py-2 rounded-l-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
                      <i className="fas fa-chevron-left"></i>
                    </button>
                    {[1, 2, 3].map((page) => (
                      <button key={page} className="px-4 py-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
                        {page}
                      </button>
                    ))}
                    <button className="px-2 py-2 rounded-r-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
                      <i className="fas fa-chevron-right"></i>
                    </button>
                  </nav>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Performance Analytics</h2>
                <ReactECharts option={chartOption} style={{ height: "300px" }} />
              </div>
            </div>

            <div>
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Notifications</h2>
                <div className="space-y-4">
                  {dashboardData?.notifications.map((notification, index) => (
                    <NotificationCard key={index} {...notification} />
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Quick Chat</h2>
                <div className="space-y-4">
                  {dashboardData?.chats.map((chat, index) => (
                    <ChatCard key={index} {...chat} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TrainerDashboard;