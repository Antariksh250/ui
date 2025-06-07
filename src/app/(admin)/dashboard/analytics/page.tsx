export const dynamic = "force-dynamic";

import { Suspense } from "react";
import AnalyticsStats from "@/components/dashboard/stats";
import QueryTrendsChart from "@/components/dashboard/query-trends-chart";
import TopCompaniesChart from "@/components/dashboard/top-companies-chart";
import ResponseTimeAnalytics from "@/components/dashboard/response-time-analytics";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="mt-1 text-sm text-gray-500">
          Insights and trends from your customer queries
        </p>
      </div>

      {/* Overview Stats */}
      <Suspense fallback={<StatsLoading />}>
        <AnalyticsStats />
      </Suspense>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Query Trends */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Query Volume Trends
          </h3>
          <Suspense fallback={<ChartLoading />}>
            <QueryTrendsChart />
          </Suspense>
        </div>

        {/* Top Companies */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Top Companies
          </h3>
          <Suspense fallback={<ChartLoading />}>
            <TopCompaniesChart />
          </Suspense>
        </div>
      </div>

      {/* Response Time Analytics */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Response Time Analytics
        </h3>
        <Suspense fallback={<ChartLoading />}>
          <ResponseTimeAnalytics />
        </Suspense>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h4 className="text-sm font-medium text-gray-500 mb-2">
            Average Response Time
          </h4>
          <p className="text-2xl font-bold text-gray-900">2.5 hours</p>
          <p className="text-xs text-green-600 mt-1">↓ 15% from last month</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h4 className="text-sm font-medium text-gray-500 mb-2">
            Conversion Rate
          </h4>
          <p className="text-2xl font-bold text-gray-900">68%</p>
          <p className="text-xs text-green-600 mt-1">↑ 5% from last month</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h4 className="text-sm font-medium text-gray-500 mb-2">
            Customer Satisfaction
          </h4>
          <p className="text-2xl font-bold text-gray-900">4.8/5</p>
          <p className="text-xs text-green-600 mt-1">↑ 0.2 from last month</p>
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
