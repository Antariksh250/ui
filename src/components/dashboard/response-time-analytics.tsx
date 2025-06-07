"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  Cell,
} from "recharts";
import { useState } from "react";
import { Clock, Target, TrendingDown, TrendingUp } from "lucide-react";

// TypeScript interfaces
interface ResponseTimeData {
  date: string;
  displayDate: string;
  avgResponseTime: number;
  queries: number;
  under1Hour: number;
  under4Hours: number;
  under24Hours: number;
  over24Hours: number;
}

interface TooltipPayload {
  color: string;
  name: string;
  value: number;
  payload: ResponseTimeData;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

// Mock data for response time analytics
const generateResponseTimeData = (): ResponseTimeData[] => {
  const days = 30;
  const data: ResponseTimeData[] = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    // Simulate response times (in hours)
    const avgResponseTime = Math.random() * 6 + 1; // 1-7 hours
    const queries = Math.floor(Math.random() * 15) + 5;

    data.push({
      date: date.toISOString().split("T")[0],
      displayDate: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      avgResponseTime: Number(avgResponseTime.toFixed(1)),
      queries,
      under1Hour: Math.floor(queries * 0.3),
      under4Hours: Math.floor(queries * 0.6),
      under24Hours: Math.floor(queries * 0.9),
      over24Hours: Math.floor(queries * 0.1),
    });
  }

  return data;
};

// Generate response time distribution data
const generateDistributionData = () => {
  return [
    { timeRange: "< 1 hour", count: 45, percentage: 18, color: "#10B981" },
    { timeRange: "1-4 hours", count: 89, percentage: 36, color: "#3B82F6" },
    { timeRange: "4-24 hours", count: 78, percentage: 32, color: "#F59E0B" },
    { timeRange: "1-3 days", count: 28, percentage: 11, color: "#EF4444" },
    { timeRange: "> 3 days", count: 7, percentage: 3, color: "#8B5CF6" },
  ];
};

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="text-sm font-medium text-gray-900 mb-2">{label}</p>
        <div className="space-y-1">
          <p className="text-sm text-blue-600">Avg: {data.avgResponseTime}h</p>
          <p className="text-xs text-gray-500">
            {data.queries} queries processed
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export default function ResponseTimeAnalytics() {
  const [chartType, setChartType] = useState<"line" | "bar" | "distribution">(
    "line"
  );
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("30d");

  const data = generateResponseTimeData();
  const distributionData = generateDistributionData();

  // Calculate key metrics
  const avgResponseTime =
    data.reduce((sum, item) => sum + item.avgResponseTime, 0) / data.length;
  const totalQueries = data.reduce((sum, item) => sum + item.queries, 0);
  const fastResponses = data.reduce((sum, item) => sum + item.under4Hours, 0);
  const responseRate = Math.round((fastResponses / totalQueries) * 100);

  // Calculate trend
  const recentAvg =
    data.slice(-7).reduce((sum, item) => sum + item.avgResponseTime, 0) / 7;
  const previousAvg =
    data.slice(-14, -7).reduce((sum, item) => sum + item.avgResponseTime, 0) /
    7;
  const trend = recentAvg < previousAvg ? "improving" : "declining";
  const trendPercentage = Math.abs(
    Math.round(((recentAvg - previousAvg) / previousAvg) * 100)
  );

  return (
    <div className="space-y-6">
      {/* Chart Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setChartType("line")}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              chartType === "line"
                ? "bg-blue-100 text-blue-700"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Trend
          </button>
          <button
            onClick={() => setChartType("bar")}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              chartType === "bar"
                ? "bg-blue-100 text-blue-700"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Daily
          </button>
          <button
            onClick={() => setChartType("distribution")}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              chartType === "distribution"
                ? "bg-blue-100 text-blue-700"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Distribution
          </button>
        </div>

        {chartType !== "distribution" && (
          <select
            value={timeRange}
            onChange={(e) =>
              setTimeRange(e.target.value as "7d" | "30d" | "90d")
            }
            className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        )}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
          <div className="flex items-center justify-center mb-2">
            <Clock className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-sm font-medium text-gray-500">
              Avg Response
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {avgResponseTime.toFixed(1)}h
          </p>
          <div className="flex items-center justify-center mt-1">
            {trend === "improving" ? (
              <TrendingDown className="w-4 h-4 text-green-500 mr-1" />
            ) : (
              <TrendingUp className="w-4 h-4 text-red-500 mr-1" />
            )}
            <span
              className={`text-xs ${
                trend === "improving" ? "text-green-600" : "text-red-600"
              }`}
            >
              {trendPercentage}% vs last week
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
          <div className="flex items-center justify-center mb-2">
            <Target className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-sm font-medium text-gray-500">SLA Met</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{responseRate}%</p>
          <p className="text-xs text-gray-500 mt-1">Within 4 hours</p>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
          <div className="flex items-center justify-center mb-2">
            <span className="text-sm font-medium text-gray-500">Fastest</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">12m</p>
          <p className="text-xs text-gray-500 mt-1">This period</p>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
          <div className="flex items-center justify-center mb-2">
            <span className="text-sm font-medium text-gray-500">
              Total Queries
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalQueries}</p>
          <p className="text-xs text-gray-500 mt-1">{timeRange}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "line" ? (
              <AreaChart data={data}>
                <defs>
                  <linearGradient
                    id="colorResponseTime"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="displayDate"
                  tick={{ fontSize: 12 }}
                  stroke="#6b7280"
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  stroke="#6b7280"
                  label={{ value: "Hours", angle: -90, position: "insideLeft" }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="avgResponseTime"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  fill="url(#colorResponseTime)"
                />
              </AreaChart>
            ) : chartType === "bar" ? (
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="displayDate"
                  tick={{ fontSize: 12 }}
                  stroke="#6b7280"
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  stroke="#6b7280"
                  label={{ value: "Hours", angle: -90, position: "insideLeft" }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="avgResponseTime"
                  fill="#3B82F6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            ) : (
              <BarChart data={distributionData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" tick={{ fontSize: 12 }} stroke="#6b7280" />
                <YAxis
                  type="category"
                  dataKey="timeRange"
                  tick={{ fontSize: 12 }}
                  stroke="#6b7280"
                  width={80}
                />
                <Tooltip
                  formatter={(value) => [`${value} queries`, "Count"]}
                  labelStyle={{ color: "#374151" }}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Response Time Targets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SLA Performance */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h4 className="text-lg font-medium text-gray-900 mb-4">
            SLA Performance
          </h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Under 1 hour</span>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: "18%" }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900">18%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Under 4 hours</span>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: "54%" }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900">54%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Under 24 hours</span>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                  <div
                    className="bg-yellow-500 h-2 rounded-full"
                    style={{ width: "86%" }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900">86%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Goals */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h4 className="text-lg font-medium text-gray-900 mb-4">
            Performance Goals
          </h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-green-800">
                  Target: 2 hours
                </p>
                <p className="text-xs text-green-600">Average response time</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-green-800">
                  {avgResponseTime > 2 ? "Not Met" : "Met"}
                </p>
                <p className="text-xs text-green-600">
                  Current: {avgResponseTime.toFixed(1)}h
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-blue-800">Target: 90%</p>
                <p className="text-xs text-blue-600">Within 4 hours</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-blue-800">
                  {responseRate >= 90 ? "Met" : "Not Met"}
                </p>
                <p className="text-xs text-blue-600">
                  Current: {responseRate}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
