export const dynamic = "force-dynamic";

import { Suspense } from "react";
import DashboardStats from "@/components/dashboard/stats";
import RecentQueries from "@/components/dashboard/recent-queries";
import QueryChart from "@/components/dashboard/query-chart";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome to your admin dashboard. Monitor customer queries and manage
          your business inquiries.
        </p>
      </div>

      {/* Stats Cards */}
      <Suspense fallback={<StatsLoading />}>
        <DashboardStats />
      </Suspense>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Query Trends Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Query Trends
          </h3>
          <Suspense fallback={<ChartLoading />}>
            <QueryChart />
          </Suspense>
        </div>

        {/* Recent Queries */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Recent Queries
          </h3>
          <Suspense fallback={<QueriesLoading />}>
            <RecentQueries />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

// Loading components
function StatsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ChartLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-64 bg-gray-200 rounded"></div>
    </div>
  );
}

function QueriesLoading() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="animate-pulse flex items-center space-x-4">
          <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
