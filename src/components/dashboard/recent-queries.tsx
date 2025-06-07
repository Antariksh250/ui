import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Eye, ArrowRight } from "lucide-react";
import StatusBadge from "@/components/dashboard/status-badge-simple";

type ContactForm = {
  _id: string;
  fullName: string;
  email: string;
  companyName: string;
  query: string;
  status: "new" | "in-progress" | "completed" | "archived";
  submittedAt: string;
};

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

async function getRecentQueries(): Promise<ContactForm[]> {
  try {
    const baseUrl = getBaseUrl();
    console.log(
      "Fetching recent queries from:",
      `${baseUrl}/api/admin/contact-forms?limit=5`
    );

    const response = await fetch(`${baseUrl}/api/admin/contact-forms?limit=5`, {
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

    return data.data?.forms || [];
  } catch (error) {
    console.error("Error fetching recent queries:", error);
    return [];
  }
}

function EmptyState() {
  return (
    <div className="text-center py-8">
      <div className="text-gray-400 mb-2">
        <i className="fas fa-inbox text-2xl"></i>
      </div>
      <p className="text-sm text-gray-500">No queries found</p>
    </div>
  );
}

export default async function RecentQueries() {
  const queries = await getRecentQueries();

  // Check if we have an error state (empty array could be either no data or error)
  // Since we return empty array on error, we'll show empty state
  if (queries.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-4">
      {queries.map((query) => (
        <div
          key={query._id}
          className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-medium text-sm">
                {query.fullName.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-medium text-gray-900 truncate">
                {query.fullName}
              </p>
              <StatusBadge status={query.status} />
            </div>

            <p className="text-xs text-gray-500 mb-1">
              {query.companyName} • {query.email}
            </p>

            <p className="text-sm text-gray-600 line-clamp-2 mb-2">
              {query.query || "No message provided"}
            </p>

            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(query.submittedAt), {
                  addSuffix: true,
                })}
              </p>
              <Link
                href={`/dashboard/queries?search=${query._id}`}
                className="text-xs text-blue-600 hover:text-blue-800 flex items-center"
              >
                <Eye className="w-3 h-3 mr-1" />
                View
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* View All Link */}
      <div className="pt-4 border-t border-gray-200">
        <Link
          href="/dashboard/queries"
          className="flex items-center justify-center w-full py-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          View All Queries
          <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </div>
  );
}
