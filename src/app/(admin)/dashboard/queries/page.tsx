export const dynamic = "force-dynamic";

import { Suspense } from "react";
import QueriesTable from "@/components/dashboard/queries-table";
import QueriesFilters from "@/components/dashboard/queries-filters";
import { Download } from "lucide-react";

type SearchParams = {
  page?: string;
  status?: string;
  search?: string;
  limit?: string;
};

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function QueriesPage({ searchParams }: PageProps) {
  const params = await searchParams;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contact Queries</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and respond to customer inquiries
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <Suspense fallback={<FiltersLoading />}>
          <QueriesFilters />
        </Suspense>
      </div>

      {/* Queries Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <Suspense fallback={<TableLoading />}>
          <QueriesTable searchParams={params} />
        </Suspense>
      </div>
    </div>
  );
}

// Loading components
function FiltersLoading() {
  return (
    <div className="animate-pulse">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="h-10 bg-gray-200 rounded w-64"></div>
          <div className="h-10 bg-gray-200 rounded w-32"></div>
        </div>
        <div className="h-10 bg-gray-200 rounded w-24"></div>
      </div>
    </div>
  );
}

function TableLoading() {
  return (
    <div className="p-6">
      <div className="animate-pulse space-y-4">
        {/* Table header */}
        <div className="grid grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 rounded"></div>
          ))}
        </div>

        {/* Table rows */}
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-6 gap-4 py-4 border-t border-gray-200"
          >
            {[...Array(6)].map((_, j) => (
              <div key={j} className="h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
