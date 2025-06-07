"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Home, MessageSquare, BarChart3, Mail, TrendingUp } from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
    exact: true,
  },
  {
    name: "Contact Queries",
    href: "/dashboard/queries",
    icon: MessageSquare,
    exact: false,
  },
  {
    name: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
    exact: false,
  },
  // {
  //   name: "Reports",
  //   href: "/dashboard/reports",
  //   icon: FileText,
  //   exact: false,
  // },
];

const quickActions = [
  {
    name: "Recent Queries",
    href: "/dashboard/queries?filter=recent",
    icon: Mail,
    count: "12",
  },
  {
    name: "Pending",
    href: "/dashboard/queries?status=new",
    icon: TrendingUp,
    count: "5",
  },
];

export default function DashboardSidebar() {
  const [currentPath, setCurrentPath] = useState("");
  const [isClient, setIsClient] = useState(false);

  // Use usePathname unconditionally
  const pathname = usePathname();

  // Handle client-side mounting
  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  // Update current path when pathname changes
  useEffect(() => {
    if (pathname) {
      setCurrentPath(pathname);
    }
  }, [pathname]);

  const isActivePath = (href: string, exact: boolean) => {
    const pathToCheck = currentPath || pathname;
    if (exact) {
      return pathToCheck === href;
    }
    return pathToCheck.startsWith(href);
  };

  // Don't render until client-side hydration is complete
  if (!isClient) {
    return (
      <div className="flex flex-col h-full bg-white border-r border-gray-200">
        <div className="flex items-center h-16 px-6 border-b border-gray-200">
          <div className="relative w-32 h-8 bg-gray-200 animate-pulse rounded"></div>
        </div>
        <div className="flex-1 px-4 py-6">
          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-10 bg-gray-200 animate-pulse rounded"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="flex items-center py-2 px-6 border-b border-gray-200">
        <Link href="/" className="flex items-center">
          <div className="relative w-20 h-14">
            <Image
              src="/images/logo-secondary.png"
              alt="Antariksh Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        <div className="mb-6">
          <div className="mt-2 space-y-1">
            {navigation.map((item) => {
              const isActive = isActivePath(item.href, item.exact);
              const IconComponent = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200
                    ${
                      isActive
                        ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    }
                  `}
                >
                  <IconComponent
                    className={`
                      mr-3 h-5 w-5 transition-colors duration-200
                      ${
                        isActive
                          ? "text-blue-600"
                          : "text-gray-400 group-hover:text-blue-500"
                      }
                    `}
                  />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Quick Actions
          </h3>
          <div className="mt-2 space-y-1">
            {quickActions.map((item) => {
              const IconComponent = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center">
                    <IconComponent className="mr-3 h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
                    {item.name}
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                    {item.count}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}
