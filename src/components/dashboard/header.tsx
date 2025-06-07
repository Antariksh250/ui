"use client";

import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { Search } from "lucide-react";
import RobustMobileNav from "./mobile-navigation";
import NotificationSystem from "./notification-system";

type UserData = {
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
};

type DashboardHeaderProps = {
  userData: UserData;
};

export default function DashboardHeader({ userData }: DashboardHeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        {/* Left side - Mobile menu button and search */}
        <div className="flex items-center">
          {/* Mobile Navigation Component */}
          <RobustMobileNav />

          {/* Desktop Search */}
          <div className="hidden sm:block ml-4 lg:ml-0">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search queries..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Right side - Notifications and user menu */}
        <div className="flex items-center space-x-4">
          {/* Mobile Search button */}
          <button
            type="button"
            className="sm:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            aria-label="Toggle search"
          >
            <Search className="h-6 w-6" />
          </button>

          {/* Notifications System */}
          <NotificationSystem />

          {/* User info and menu */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-gray-900">
                {userData.firstName} {userData.lastName}
              </p>
              <p className="text-xs text-gray-500">{userData.email}</p>
            </div>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8",
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Mobile search - appears below header when toggled */}
      {isSearchOpen && (
        <div className="sm:hidden mt-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search queries..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  );
}
