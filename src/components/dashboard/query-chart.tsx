"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { useState } from "react";
import type { TooltipProps } from "recharts";

// Mock data - in real implementation, this would come from your API
const generateMockData = () => {
  const days = 30;
  const data = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    data.push({
      date: date.toISOString().split("T")[0],
      displayDate: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      new: Math.floor(Math.random() * 8) + 1,
      inProgress: Math.floor(Math.random() * 5) + 1,
      completed: Math.floor(Math.random() * 10) + 2,
      total: 0,
    });
  }

  // Calculate totals
  data.forEach((item) => {
    item.total = item.new + item.inProgress + item.completed;
  });

  return data;
};

const statusColors = {
  new: "#EAB308", // yellow-500
  inProgress: "#3B82F6", // blue-500
  completed: "#10B981", // green-500
  total: "#6B7280", // gray-500
};

export default function QueryChart() {
  const [chartType, setChartType] = useState<"line" | "bar">("line");
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("30d");

  const data = generateMockData();

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-gray-900 mb-2">{label}</p>
          {(Array.isArray(payload) ? payload : []).map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {entry?.name}: {entry?.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
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
            Line
          </button>
          <button
            onClick={() => setChartType("bar")}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              chartType === "bar"
                ? "bg-blue-100 text-blue-700"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Bar
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

      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "line" ? (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="displayDate"
                tick={{ fontSize: 12 }}
                stroke="#6b7280"
              />
              <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="new"
                stroke={statusColors.new}
                strokeWidth={2}
                dot={{ fill: statusColors.new, strokeWidth: 2, r: 3 }}
                name="New"
              />
              <Line
                type="monotone"
                dataKey="inProgress"
                stroke={statusColors.inProgress}
                strokeWidth={2}
                dot={{ fill: statusColors.inProgress, strokeWidth: 2, r: 3 }}
                name="In Progress"
              />
              <Line
                type="monotone"
                dataKey="completed"
                stroke={statusColors.completed}
                strokeWidth={2}
                dot={{ fill: statusColors.completed, strokeWidth: 2, r: 3 }}
                name="Completed"
              />
            </LineChart>
          ) : (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="displayDate"
                tick={{ fontSize: 12 }}
                stroke="#6b7280"
              />
              <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="new" fill={statusColors.new} name="New" />
              <Bar
                dataKey="inProgress"
                fill={statusColors.inProgress}
                name="In Progress"
              />
              <Bar
                dataKey="completed"
                fill={statusColors.completed}
                name="Completed"
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center space-x-6 text-sm">
        <div className="flex items-center">
          <div
            className="w-3 h-3 rounded-full mr-2"
            style={{ backgroundColor: statusColors.new }}
          ></div>
          <span className="text-gray-600">New Queries</span>
        </div>
        <div className="flex items-center">
          <div
            className="w-3 h-3 rounded-full mr-2"
            style={{ backgroundColor: statusColors.inProgress }}
          ></div>
          <span className="text-gray-600">In Progress</span>
        </div>
        <div className="flex items-center">
          <div
            className="w-3 h-3 rounded-full mr-2"
            style={{ backgroundColor: statusColors.completed }}
          ></div>
          <span className="text-gray-600">Completed</span>
        </div>
      </div>
    </div>
  );
}
