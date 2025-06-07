"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Mail, Phone, Building, Calendar, Globe, Monitor } from "lucide-react";
import StatusBadge from "@/components/dashboard/status-badge";

type ContactForm = {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  companyName: string;
  query: string;
  status: "new" | "in-progress" | "completed" | "archived";
  submittedAt: string;
  ipAddress?: string;
  userAgent?: string;
};

type QueryModalProps = {
  query: ContactForm | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusUpdate: (id: string, status: string) => void;
};

export default function QueryModal({
  query,
  isOpen,
  onClose,
  onStatusUpdate,
}: QueryModalProps) {
  if (!query) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const getBrowserInfo = (userAgent: string) => {
    if (!userAgent) return "Unknown";

    if (userAgent.includes("Chrome")) return "Chrome";
    if (userAgent.includes("Firefox")) return "Firefox";
    if (userAgent.includes("Safari")) return "Safari";
    if (userAgent.includes("Edge")) return "Edge";
    return "Other";
  };

  const getDeviceInfo = (userAgent: string) => {
    if (!userAgent) return "Unknown";

    if (userAgent.includes("Mobile")) return "Mobile";
    if (userAgent.includes("Tablet")) return "Tablet";
    return "Desktop";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
            Query Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header with Status */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {query.fullName}
              </h3>
              <p className="text-sm text-gray-500">Query ID: {query._id}</p>
            </div>
            <StatusBadge
              status={query.status}
              onChange={(status) => onStatusUpdate(query._id, status)}
            />
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              Contact Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-gray-400 mr-2" />
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm text-gray-900">{query.email}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-gray-400 mr-2" />
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="text-sm text-gray-900">{query.phoneNumber}</p>
                </div>
              </div>
              <div className="flex items-center md:col-span-2">
                <Building className="h-4 w-4 text-gray-400 mr-2" />
                <div>
                  <p className="text-xs text-gray-500">Company</p>
                  <p className="text-sm text-gray-900">{query.companyName}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Query Message */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Message</h4>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-700 whitespace-pre-wrap">
                {query.query || "No message provided"}
              </p>
            </div>
          </div>

          {/* Submission Details */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              Submission Details
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                <div>
                  <p className="text-xs text-gray-500">Submitted</p>
                  <p className="text-sm text-gray-900">
                    {formatDate(query.submittedAt)}
                  </p>
                </div>
              </div>
              {query.ipAddress && (
                <div className="flex items-center">
                  <Globe className="h-4 w-4 text-gray-400 mr-2" />
                  <div>
                    <p className="text-xs text-gray-500">IP Address</p>
                    <p className="text-sm text-gray-900">{query.ipAddress}</p>
                  </div>
                </div>
              )}
              {query.userAgent && (
                <div className="flex items-center md:col-span-2">
                  <Monitor className="h-4 w-4 text-gray-400 mr-2" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">Device & Browser</p>
                    <p className="text-sm text-gray-900">
                      {getDeviceInfo(query.userAgent)} •{" "}
                      {getBrowserInfo(query.userAgent)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Close
            </button>
            <a
              href={`mailto:${query.email}?subject=Re: Your inquiry from ${query.companyName}&body=Hi ${query.fullName},%0D%0A%0D%0AThank you for your inquiry. `}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Reply via Email
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
