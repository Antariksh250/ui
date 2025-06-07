"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { useState } from "react";

// TypeScript interfaces for Recharts tooltip
interface TooltipPayload {
  color: string;
  name: string;
  value: number;
  payload: {
    weekDay: string;
    queries: number;
    displayDate: string;
  };
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

// Mock data - in real implementation, this would come from your API
const generateTrendsData = () => {
  const days = 30;
  const data = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    // Simulate realistic query patterns
    const baseQueries = Math.floor(Math.random() * 15) + 5;
    const weekendFactor = date.getDay() === 0 || date.getDay() === 6 ? 0.3 : 1;
    const queries = Math.floor(baseQueries * weekendFactor);

    data.push({
      date: date.toISOString().split("T")[0],
      displayDate: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      queries: queries,
      weekDay: date.toLocaleDateString("en-US", { weekday: "short" }),
      trend: i < 15 ? "increasing" : i < 20 ? "stable" : "decreasing",
    });
  }

  return data;
};

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="text-sm font-medium text-gray-900 mb-1">{label}</p>
        <p className="text-sm text-blue-600">{payload[0].value} queries</p>
        <p className="text-xs text-gray-500 mt-1">{data.weekDay}</p>
      </div>
    );
  }
  return null;
};

export default function QueryTrendsChart() {
  const [chartType, setChartType] = useState<"line" | "area">("area");
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("30d");

  const data = generateTrendsData();

  // Calculate trend statistics
  const totalQueries = data.reduce((sum, item) => sum + item.queries, 0);
  const avgDailyQueries = Math.round(totalQueries / data.length);
  const lastWeekAvg = Math.round(
    data.slice(-7).reduce((sum, item) => sum + item.queries, 0) / 7
  );
  const prevWeekAvg = Math.round(
    data.slice(-14, -7).reduce((sum, item) => sum + item.queries, 0) / 7
  );
  const weekOverWeekChange = Math.round(
    ((lastWeekAvg - prevWeekAvg) / prevWeekAvg) * 100
  );

  return (
    <div className="space-y-4">
      {/* Chart Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setChartType("area")}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              chartType === "area"
                ? "bg-blue-100 text-blue-700"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Area
          </button>
          <button
            onClick={() => setChartType("line")}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              chartType === "line"
                ? "bg-blue-100 text-blue-700"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Line
          </button>
        </div>

        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value as "7d" | "30d" | "90d")}
          className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">{totalQueries}</p>
          <p className="text-xs text-gray-500">Total Queries</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">{avgDailyQueries}</p>
          <p className="text-xs text-gray-500">Daily Average</p>
        </div>
        <div className="text-center">
          <p
            className={`text-2xl font-bold ${
              weekOverWeekChange >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {weekOverWeekChange > 0 ? "+" : ""}
            {weekOverWeekChange}%
          </p>
          <p className="text-xs text-gray-500">Week over Week</p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "area" ? (
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorQueries" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="displayDate"
                tick={{ fontSize: 12 }}
                stroke="#6b7280"
                interval="preserveStartEnd"
              />
              <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="queries"
                stroke="#3B82F6"
                strokeWidth={2}
                fill="url(#colorQueries)"
              />
            </AreaChart>
          ) : (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="displayDate"
                tick={{ fontSize: 12 }}
                stroke="#6b7280"
                interval="preserveStartEnd"
              />
              <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="queries"
                stroke="#3B82F6"
                strokeWidth={3}
                dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#3B82F6", strokeWidth: 2 }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Trend Insights */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Insights</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-gray-600">Peak activity on weekdays</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span className="text-gray-600">
              {weekOverWeekChange >= 0 ? "Growing" : "Declining"} trend this
              week
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
