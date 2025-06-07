import {
  MessageSquare,
  Clock,
  TrendingUp,
  Users,
  Target,
  Calendar,
  Globe,
  Zap,
} from "lucide-react";

async function getAnalyticsStats() {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      }/api/admin/contact-forms?limit=1`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch analytics stats");
    }

    const data = await response.json();

    // In a real implementation, you would have separate analytics endpoints
    // For now, we'll generate mock analytics based on the basic stats
    const baseStats = data.data?.stats || {
      total: 0,
      new: 0,
      inProgress: 0,
      completed: 0,
      archived: 0,
    };

    // Generate mock analytics data
    return {
      totalQueries: baseStats.total,
      avgResponseTime: 2.5, // hours
      conversionRate: 68, // percentage
      uniqueCompanies: Math.floor(baseStats.total * 0.6),
      responseRate: 94, // percentage of queries responded to
      satisfaction: 4.8, // out of 5
      weeklyGrowth: 12, // percentage
      monthlyGoalProgress: 78, // percentage
    };
  } catch (error) {
    console.error("Error fetching analytics stats:", error);
    return {
      totalQueries: 0,
      avgResponseTime: 0,
      conversionRate: 0,
      uniqueCompanies: 0,
      responseRate: 0,
      satisfaction: 0,
      weeklyGrowth: 0,
      monthlyGoalProgress: 0,
    };
  }
}

export default async function AnalyticsStats() {
  const stats = await getAnalyticsStats();

  const statCards = [
    {
      title: "Total Queries",
      value: stats.totalQueries.toString(),
      icon: MessageSquare,
      color: "blue",
      description: "All time submissions",
      trend: "+8% from last month",
      trendUp: true,
    },
    {
      title: "Avg Response Time",
      value: `${stats.avgResponseTime}h`,
      icon: Clock,
      color: "green",
      description: "Average response",
      trend: "-15% improvement",
      trendUp: true,
    },
    {
      title: "Conversion Rate",
      value: `${stats.conversionRate}%`,
      icon: Target,
      color: "purple",
      description: "Queries to clients",
      trend: "+5% from last month",
      trendUp: true,
    },
    {
      title: "Weekly Growth",
      value: `+${stats.weeklyGrowth}%`,
      icon: TrendingUp,
      color: "orange",
      description: "Week over week",
      trend: "Strong momentum",
      trendUp: true,
    },
    {
      title: "Unique Companies",
      value: stats.uniqueCompanies.toString(),
      icon: Users,
      color: "indigo",
      description: "Distinct organizations",
      trend: "+3 new this week",
      trendUp: true,
    },
    {
      title: "Response Rate",
      value: `${stats.responseRate}%`,
      icon: Zap,
      color: "emerald",
      description: "Queries responded to",
      trend: "Above target",
      trendUp: true,
    },
    {
      title: "Satisfaction",
      value: `${stats.satisfaction}/5`,
      icon: Globe,
      color: "rose",
      description: "Customer rating",
      trend: "+0.2 improvement",
      trendUp: true,
    },
    {
      title: "Monthly Goal",
      value: `${stats.monthlyGoalProgress}%`,
      icon: Calendar,
      color: "cyan",
      description: "Progress to goal",
      trend: "On track",
      trendUp: true,
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        bg: "bg-blue-50",
        icon: "text-blue-600",
        text: "text-blue-900",
        border: "border-blue-100",
      },
      green: {
        bg: "bg-green-50",
        icon: "text-green-600",
        text: "text-green-900",
        border: "border-green-100",
      },
      purple: {
        bg: "bg-purple-50",
        icon: "text-purple-600",
        text: "text-purple-900",
        border: "border-purple-100",
      },
      orange: {
        bg: "bg-orange-50",
        icon: "text-orange-600",
        text: "text-orange-900",
        border: "border-orange-100",
      },
      indigo: {
        bg: "bg-indigo-50",
        icon: "text-indigo-600",
        text: "text-indigo-900",
        border: "border-indigo-100",
      },
      emerald: {
        bg: "bg-emerald-50",
        icon: "text-emerald-600",
        text: "text-emerald-900",
        border: "border-emerald-100",
      },
      rose: {
        bg: "bg-rose-50",
        icon: "text-rose-600",
        text: "text-rose-900",
        border: "border-rose-100",
      },
      cyan: {
        bg: "bg-cyan-50",
        icon: "text-cyan-600",
        text: "text-cyan-900",
        border: "border-cyan-100",
      },
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat) => {
        const colors = getColorClasses(stat.color);
        return (
          <div
            key={stat.title}
            className={`bg-white rounded-lg shadow-sm border ${colors.border} p-6 hover:shadow-md transition-all duration-200 hover:scale-105`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${colors.bg}`}>
                <stat.icon className={`h-6 w-6 ${colors.icon}`} />
              </div>
              {stat.trendUp && (
                <div className="flex items-center text-green-600">
                  <TrendingUp className="h-4 w-4" />
                </div>
              )}
            </div>

            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <p className={`text-2xl font-bold ${colors.text}`}>
                {stat.value}
              </p>
              <p className="text-xs text-gray-500">{stat.description}</p>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <p
                className={`text-xs ${
                  stat.trendUp ? "text-green-600" : "text-red-600"
                } font-medium`}
              >
                {stat.trend}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
