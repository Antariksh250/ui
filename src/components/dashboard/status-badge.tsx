"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type Status = "new" | "in-progress" | "completed" | "archived";

type StatusBadgeProps = {
  status: Status;
  onChange: (status: Status) => void;
};

const statusConfig = {
  new: {
    label: "New",
    colors: "bg-yellow-100 text-yellow-800 border-yellow-200",
    dotColor: "bg-yellow-400",
  },
  "in-progress": {
    label: "In Progress",
    colors: "bg-blue-100 text-blue-800 border-blue-200",
    dotColor: "bg-blue-400",
  },
  completed: {
    label: "Completed",
    colors: "bg-green-100 text-green-800 border-green-200",
    dotColor: "bg-green-400",
  },
  archived: {
    label: "Archived",
    colors: "bg-gray-100 text-gray-800 border-gray-200",
    dotColor: "bg-gray-400",
  },
};

export default function StatusBadge({ status, onChange }: StatusBadgeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const currentStatus = statusConfig[status];

  const handleStatusChange = (newStatus: Status) => {
    onChange(newStatus);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border
          ${currentStatus.colors}
          hover:shadow-sm transition-all duration-200
        `}
      >
        <span
          className={`w-2 h-2 rounded-full mr-2 ${currentStatus.dotColor}`}
        ></span>
        {currentStatus.label}
        <ChevronDown className="ml-1 h-3 w-3" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Dropdown */}
          <div className="absolute right-0 mt-1 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-20">
            <div className="py-1">
              {Object.entries(statusConfig).map(([key, config]) => (
                <button
                  key={key}
                  onClick={() => handleStatusChange(key as Status)}
                  className={`
                    w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center
                    ${status === key ? "bg-gray-50" : ""}
                  `}
                >
                  <span
                    className={`w-2 h-2 rounded-full mr-3 ${config.dotColor}`}
                  ></span>
                  {config.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
