import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Eye, ArrowRight } from "lucide-react";
import StatusBadge from "@/components/dashboard/status-badge-simple";
import { getRecentQueries } from "@/lib/fetchQueries";

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
  const queries = await getRecentQueries(5);

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
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-medium text-sm">
                {query.fullName.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>

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
