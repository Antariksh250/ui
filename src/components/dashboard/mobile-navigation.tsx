"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Home,
  MessageSquare,
  BarChart3,
  Mail,
  TrendingUp,
  X,
  Menu,
} from "lucide-react";

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

export default function RobustMobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  const isActivePath = useCallback(
    (href: string, exact: boolean) => {
      if (exact) {
        return pathname === href;
      }
      return pathname?.startsWith(href);
    },
    [pathname]
  );

  const openMenu = useCallback(() => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = "";
  }, []);

  const handleMenuClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  const handleLinkClick = useCallback(() => {
    closeMenu();
  }, [closeMenu]);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        type="button"
        onClick={openMenu}
        className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
        aria-label="Open navigation menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/50" onClick={closeMenu} />

          {/* Sidebar */}
          <div
            ref={menuRef}
            onClick={handleMenuClick}
            className="fixed inset-y-0 left-0 w-78 bg-white shadow-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between py-2 px-6 border-b border-gray-200">
              <Link href="/" onClick={handleLinkClick}>
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
              <button
                onClick={closeMenu}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                aria-label="Close navigation menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Navigation Content */}
            <div className="flex flex-col h-full overflow-y-auto">
              <nav className="flex-1 px-4 py-6">
                {/* Main Navigation */}
                <div className="mb-8">
                  <div className="space-y-1">
                    {navigation.map((item) => {
                      const isActive = isActivePath(item.href, item.exact);
                      const IconComponent = item.icon;

                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={handleLinkClick}
                          className={`
                            flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200
                            ${
                              isActive
                                ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
                                : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                            }
                          `}
                        >
                          <IconComponent
                            className={`mr-3 h-5 w-5 ${
                              isActive ? "text-blue-600" : "text-gray-400"
                            }`}
                          />
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="mb-8">
                  <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Quick Actions
                  </h3>
                  <div className="space-y-1">
                    {quickActions.map((item) => {
                      const IconComponent = item.icon;

                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={handleLinkClick}
                          className="flex items-center justify-between px-3 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-blue-600 transition-all duration-200"
                        >
                          <div className="flex items-center">
                            <IconComponent className="mr-3 h-5 w-5 text-gray-400" />
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

              {/* Footer */}
              <div className="border-t border-gray-200 p-4">
                <p className="text-xs text-gray-500 text-center">
                  © 2025 Antariksh
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
