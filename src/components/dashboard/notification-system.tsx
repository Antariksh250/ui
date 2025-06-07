"use client";

import { useState, useRef, useEffect } from "react";
import {
  Bell,
  X,
  Check,
  Eye,
  MessageSquare,
  BarChart3,
  Clock,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

// Types for notifications
interface Notification {
  id: string;
  title: string;
  message: string;
  type: "query" | "analytics" | "system" | "update";
  isRead: boolean;
  createdAt: Date;
  actionUrl?: string;
}

// Mock notifications data - replace with real data from your API
const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "New Contact Query",
    message:
      "John Doe from TechCorp submitted a new inquiry about web development services.",
    type: "query",
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    actionUrl: "/dashboard/queries",
  },
  {
    id: "2",
    title: "Weekly Analytics Report",
    message:
      "Your weekly analytics report is ready. Query volume increased by 18% this week.",
    type: "analytics",
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    actionUrl: "/dashboard/analytics",
  },
  {
    id: "3",
    title: "Query Status Updated",
    message: "Query from ABC Company has been marked as completed.",
    type: "update",
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    actionUrl: "/dashboard/queries",
  },
  {
    id: "4",
    title: "System Maintenance",
    message:
      "Scheduled maintenance will occur tonight from 2:00 AM to 4:00 AM EST.",
    type: "system",
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
  },
  {
    id: "5",
    title: "New Contact Query",
    message:
      "Sarah Johnson from StartupX is interested in mobile app development.",
    type: "query",
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    actionUrl: "/dashboard/queries",
  },
];

const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "query":
      return <MessageSquare className="h-4 w-4" />;
    case "analytics":
      return <BarChart3 className="h-4 w-4" />;
    case "update":
      return <Check className="h-4 w-4" />;
    case "system":
      return <Clock className="h-4 w-4" />;
    default:
      return <Bell className="h-4 w-4" />;
  }
};

const getNotificationColor = (type: Notification["type"]) => {
  switch (type) {
    case "query":
      return "bg-blue-100 text-blue-600";
    case "analytics":
      return "bg-green-100 text-green-600";
    case "update":
      return "bg-purple-100 text-purple-600";
    case "system":
      return "bg-orange-100 text-orange-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

export default function NotificationSystem() {
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true }))
    );
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== notificationId)
    );
  };

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.isRead) {
      markAsRead(notification.id);
    }

    if (notification.actionUrl) {
      // Navigate to the action URL
      window.location.href = notification.actionUrl;
    }

    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Notification Button */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200"
        aria-label={`View notifications ${
          unreadCount > 0 ? `(${unreadCount} unread)` : ""
        }`}
      >
        <Bell className="h-6 w-6" />

        {/* Notification Badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs font-medium rounded-full flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-gray-600" />
              <h3 className="text-lg font-medium text-gray-900">
                Notifications
              </h3>
            </div>

            <div className="flex items-center space-x-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                >
                  Mark all read
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="overflow-y-auto max-h-80">
            {notifications.length === 0 ? (
              <div className="p-6 text-center">
                <Bell className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500">No notifications</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {notifications.slice(0, 10).map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-gray-50 transition-colors duration-200 cursor-pointer ${
                      !notification.isRead ? "bg-blue-50" : ""
                    }`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex items-start space-x-3">
                      {/* Icon */}
                      <div
                        className={`flex-shrink-0 p-2 rounded-lg ${getNotificationColor(
                          notification.type
                        )}`}
                      >
                        {getNotificationIcon(notification.type)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400 mt-2">
                              {formatDistanceToNow(notification.createdAt, {
                                addSuffix: true,
                              })}
                            </p>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center space-x-1 ml-2">
                            {!notification.isRead && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  markAsRead(notification.id);
                                }}
                                className="p-1 rounded-md text-gray-400 hover:text-blue-600 hover:bg-blue-100"
                                title="Mark as read"
                              >
                                <Eye className="h-3 w-3" />
                              </button>
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notification.id);
                              }}
                              className="p-1 rounded-md text-gray-400 hover:text-red-600 hover:bg-red-100"
                              title="Delete notification"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        </div>

                        {/* Unread indicator */}
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full absolute left-2 top-6"></div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="border-t border-gray-200 p-3">
              <button
                onClick={() => {
                  setIsOpen(false);
                  // Navigate to a notifications page if you have one
                  // window.location.href = '/dashboard/notifications';
                }}
                className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                View all notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
