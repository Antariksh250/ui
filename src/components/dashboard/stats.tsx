import { MessageSquare, Clock, CheckCircle, Archive } from "lucide-react";

// Helper function to get the base URL
function getBaseUrl() {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
}

async function getContactStats() {
  try {
    const baseUrl = getBaseUrl();
    console.log(
      "Fetching stats from:",
      `${baseUrl}/api/admin/contact-forms?limit=1`
    );

    const response = await fetch(`${baseUrl}/api/admin/contact-forms?limit=1`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error(
        "API response not ok:",
        response.status,
        response.statusText
      );
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.success) {
      console.error("API returned error:", data.error);
      throw new Error(data.error || "API returned unsuccessful response");
    }

    return (
      data.data?.stats || {
        total: 0,
        new: 0,
        inProgress: 0,
        completed: 0,
        archived: 0,
      }
    );
  } catch (error) {
    console.error("Error fetching stats:", error);

    // Return default stats on error instead of throwing
    return {
      total: 0,
      new: 0,
      inProgress: 0,
      completed: 0,
      archived: 0,
    };
  }
}

export default async function DashboardStats() {
  const stats = await getContactStats();

  const statCards = [
    {
      title: "Total Queries",
      value: stats.total,
      icon: MessageSquare,
      color: "blue",
      description: "All time queries",
    },
    {
      title: "New Queries",
      value: stats.new,
      icon: Clock,
      color: "yellow",
      description: "Pending review",
    },
    {
      title: "In Progress",
      value: stats.inProgress,
      icon: CheckCircle,
      color: "green",
      description: "Being processed",
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: Archive,
      color: "gray",
      description: "Resolved queries",
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        bg: "bg-blue-50",
        icon: "text-blue-600",
        text: "text-blue-900",
      },
      yellow: {
        bg: "bg-yellow-50",
        icon: "text-yellow-600",
        text: "text-yellow-900",
      },
      green: {
        bg: "bg-green-50",
        icon: "text-green-600",
        text: "text-green-900",
      },
      gray: {
        bg: "bg-gray-50",
        icon: "text-gray-600",
        text: "text-gray-900",
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
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${colors.bg}`}>
                <stat.icon className={`h-6 w-6 ${colors.icon}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>
                <p className={`text-2xl font-bold ${colors.text}`}>
                  {stat.value}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-xs text-gray-500">{stat.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
