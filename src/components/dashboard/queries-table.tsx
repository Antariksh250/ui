"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Eye,
  Mail,
  Phone,
  Building,
  Calendar,
  MoreHorizontal,
} from "lucide-react";
import StatusBadge from "@/components/dashboard/status-badge";
import QueryModal from "@/components/dashboard/query-modal";
import Pagination from "@/components/dashboard/pagination";
import BulkOperations from "@/components/dashboard/bulk-operations";
import type {
  ContactForm,
  QueriesData,
  QueriesSearchParams,
} from "@/types/dashboard";

type QueriesTableProps = {
  searchParams: QueriesSearchParams;
};

export default function QueriesTable({ searchParams }: QueriesTableProps) {
  const [data, setData] = useState<QueriesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedQuery, setSelectedQuery] = useState<ContactForm | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const fetchQueries = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();

      if (searchParams.page) params.append("page", searchParams.page);
      if (searchParams.status) params.append("status", searchParams.status);
      if (searchParams.search) params.append("search", searchParams.search);
      if (searchParams.limit) params.append("limit", searchParams.limit);

      const response = await fetch(
        `/api/admin/contact-forms?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch queries");
      }

      const result = await response.json();
      setData(result.data);
    } catch (error) {
      console.error("Error fetching queries:", error);
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchQueries();
  }, [searchParams, fetchQueries]);

  useEffect(() => {
    // Clear selections when data changes
    setSelectedIds([]);
  }, [data]);

  const handleViewQuery = (query: ContactForm) => {
    setSelectedQuery(query);
    setIsModalOpen(true);
  };

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/admin/contact-forms/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      // Refresh the data
      fetchQueries();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleSelectQuery = (queryId: string) => {
    setSelectedIds((prev) =>
      prev.includes(queryId)
        ? prev.filter((id) => id !== queryId)
        : [...prev, queryId]
    );
  };

  const handleSelectAll = () => {
    if (!data) return;

    if (selectedIds.length === data.forms.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(data.forms.map((form) => form._id));
    }
  };

  const isAllSelected = data
    ? selectedIds.length === data.forms.length && data.forms.length > 0
    : false;
  const isIndeterminate =
    selectedIds.length > 0 && selectedIds.length < (data?.forms.length || 0);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return <TableLoading />;
  }

  if (!data) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">
          Failed to load queries. Please try again.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden">
        {/* Table Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            All Queries ({data.pagination.total})
          </h3>
        </div>

        {/* Bulk Operations */}
        <BulkOperations
          selectedIds={selectedIds}
          onClearSelection={() => setSelectedIds([])}
          onRefresh={fetchQueries}
        />

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    ref={(el) => {
                      if (el) el.indeterminate = isIndeterminate;
                    }}
                    onChange={handleSelectAll}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Query
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submitted
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.forms.map((query) => (
                <tr key={query._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(query._id)}
                      onChange={() => handleSelectQuery(query._id)}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <div className="text-sm font-medium text-gray-900">
                        {query.fullName}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Mail className="h-3 w-3 mr-1" />
                        {query.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Phone className="h-3 w-3 mr-1" />
                        {query.phoneNumber}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <Building className="h-4 w-4 mr-2 text-gray-400" />
                      {query.companyName}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">
                      {query.query || "No message provided"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge
                      status={query.status}
                      onChange={(status) =>
                        handleStatusUpdate(query._id, status)
                      }
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      {formatDate(query.submittedAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleViewQuery(query)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200">
          <Pagination
            currentPage={data.pagination.page}
            totalPages={data.pagination.pages}
            totalItems={data.pagination.total}
            itemsPerPage={data.pagination.limit}
          />
        </div>
      </div>

      {/* Query Modal */}
      <QueryModal
        query={selectedQuery}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onStatusUpdate={handleStatusUpdate}
      />
    </>
  );
}

function TableLoading() {
  return (
    <div className="p-6">
      <div className="animate-pulse space-y-4">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="grid grid-cols-6 gap-4 py-4">
            {[...Array(6)].map((_, j) => (
              <div key={j} className="h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
