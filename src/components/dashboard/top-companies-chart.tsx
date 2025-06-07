"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useState } from "react";
import { Building, TrendingUp } from "lucide-react";

// TypeScript interfaces
interface CompanyData {
  name: string;
  shortName: string;
  queries: number;
  color: string;
  growth: number;
  lastQuery: number;
}

interface TooltipPayload {
  color: string;
  name: string;
  value: number;
  payload: CompanyData;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

interface PieLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
}

// Mock data - in real implementation, this would come from your API
const generateCompaniesData = (): CompanyData[] => {
  const companies = [
    "TechCorp Solutions",
    "Digital Innovations Ltd",
    "StartupHub Inc",
    "Enterprise Systems",
    "Creative Agency Pro",
    "Global Tech Partners",
    "Innovation Labs",
    "Business Solutions Co",
    "Future Tech LLC",
    "Smart Systems Inc",
  ];

  return companies
    .map((company, index) => ({
      name: company,
      shortName: company.split(" ")[0],
      queries: Math.floor(Math.random() * 25) + 5,
      color: `hsl(${(index * 36) % 360}, 70%, 50%)`,
      growth: Math.floor(Math.random() * 40) - 20, // -20% to +20%
      lastQuery: Math.floor(Math.random() * 30) + 1, // days ago
    }))
    .sort((a, b) => b.queries - a.queries)
    .slice(0, 8);
};

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg min-w-[200px]">
        <p className="text-sm font-medium text-gray-900 mb-2">{data.name}</p>
        <div className="space-y-1">
          <p className="text-sm text-blue-600">{data.queries} queries</p>
          <p className="text-xs text-gray-500">
            Last query: {data.lastQuery} days ago
          </p>
          <p
            className={`text-xs ${
              data.growth >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {data.growth >= 0 ? "+" : ""}
            {data.growth}% vs last month
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: PieLabelProps) => {
  if (percent < 0.05) return null; // Don't show labels for slices smaller than 5%

  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize="12"
      fontWeight="600"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function TopCompaniesChart() {
  const [chartType, setChartType] = useState<"bar" | "pie">("bar");
  const [showGrowth, setShowGrowth] = useState(false);

  const data = generateCompaniesData();
  const totalQueries = data.reduce((sum, item) => sum + item.queries, 0);

  return (
    <div className="space-y-4">
      {/* Chart Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
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
          <button
            onClick={() => setChartType("pie")}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              chartType === "pie"
                ? "bg-blue-100 text-blue-700"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Pie
          </button>
        </div>

        <button
          onClick={() => setShowGrowth(!showGrowth)}
          className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
        >
          <TrendingUp className="w-4 h-4 mr-1" />
          {showGrowth ? "Hide" : "Show"} Growth
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">{data.length}</p>
          <p className="text-xs text-gray-500">Active Companies</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">{totalQueries}</p>
          <p className="text-xs text-gray-500">Total Queries</p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "bar" ? (
            <BarChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="shortName"
                tick={{ fontSize: 12 }}
                stroke="#6b7280"
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="queries" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          ) : (
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="queries"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Company List */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-900">Top Companies</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {data.slice(0, 5).map((company, index) => (
            <div
              key={company.name}
              className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-6 h-6 bg-blue-100 rounded text-xs font-medium text-blue-600">
                  {index + 1}
                </div>
                <div className="flex items-center">
                  <Building className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-sm font-medium text-gray-900 truncate max-w-[120px]">
                    {company.name}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">
                  {company.queries} queries
                </span>
                {showGrowth && (
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      company.growth >= 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {company.growth >= 0 ? "+" : ""}
                    {company.growth}%
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chart Legend for Pie */}
      {chartType === "pie" && (
        <div className="grid grid-cols-2 gap-2 text-xs">
          {data.map((company) => (
            <div key={company.name} className="flex items-center">
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: company.color }}
              ></div>
              <span className="text-gray-600 truncate">
                {company.shortName} ({company.queries})
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
