"use client";

import DesktopNavigationBar from "./desktop-navigation-bar";
import MobileNavigation from "./mobile-nav";

export default function Header() {
  return (
    <div className="w-full py-11 lg:py-11 xl:py-[64px] px-4 fixed top-0 z-50 bg-transparent flex items-center justify-end lg:justify-center">
      <div className="lg:px-2 lg:py-2 bg-white rounded-md drop-shadow-sm z-10">
        <div className="hidden lg:block">
          <DesktopNavigationBar />
        </div>

        <div className="block lg:hidden">
          <MobileNavigation />
        </div>
      </div>
    </div>
  );
}
