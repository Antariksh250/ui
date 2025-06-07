"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Archive, CheckCircle, Clock } from "lucide-react";
import { toast } from "sonner";

type BulkOperationsProps = {
  selectedIds: string[];
  onClearSelection: () => void;
  onRefresh: () => void;
};

export default function BulkOperations({
  selectedIds,
  onClearSelection,
  onRefresh,
}: BulkOperationsProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleBulkStatusUpdate = async (status: string) => {
    if (selectedIds.length === 0) return;

    setIsLoading(true);

    try {
      const updatePromises = selectedIds.map((id) =>
        fetch(`/api/admin/contact-forms/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        })
      );

      await Promise.all(updatePromises);

      toast.success(`${selectedIds.length} queries updated successfully`);
      onClearSelection();
      onRefresh();
    } catch (error) {
      console.error("Error updating queries:", error);
      toast.error("Failed to update queries");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;

    const confirmed = confirm(
      `Are you sure you want to delete ${selectedIds.length} selected queries? This action cannot be undone.`
    );

    if (!confirmed) return;

    setIsLoading(true);

    try {
      const deletePromises = selectedIds.map((id) =>
        fetch(`/api/admin/contact-forms/${id}`, {
          method: "DELETE",
        })
      );

      await Promise.all(deletePromises);

      toast.success(`${selectedIds.length} queries deleted successfully`);
      onClearSelection();
      onRefresh();
    } catch (error) {
      console.error("Error deleting queries:", error);
      toast.error("Failed to delete queries");
    } finally {
      setIsLoading(false);
    }
  };

  if (selectedIds.length === 0) return null;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-blue-900">
            {selectedIds.length}{" "}
            {selectedIds.length === 1 ? "query" : "queries"} selected
          </span>

          <button
            onClick={onClearSelection}
            className="text-xs text-blue-600 hover:text-blue-800 underline"
          >
            Clear selection
          </button>
        </div>

        <div className="flex items-center space-x-2">
          {/* Status Update Buttons */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleBulkStatusUpdate("in-progress")}
            disabled={isLoading}
            className="text-blue-600 border-blue-200 hover:bg-blue-100"
          >
            <Clock className="w-4 h-4 mr-1" />
            Mark In Progress
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleBulkStatusUpdate("completed")}
            disabled={isLoading}
            className="text-green-600 border-green-200 hover:bg-green-100"
          >
            <CheckCircle className="w-4 h-4 mr-1" />
            Mark Completed
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleBulkStatusUpdate("archived")}
            disabled={isLoading}
            className="text-gray-600 border-gray-200 hover:bg-gray-100"
          >
            <Archive className="w-4 h-4 mr-1" />
            Archive
          </Button>

          {/* Delete Button */}
          <Button
            variant="destructive"
            size="sm"
            onClick={handleBulkDelete}
            disabled={isLoading}
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
