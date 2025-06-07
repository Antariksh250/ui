import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isAdminEmail } from "@/lib/admin-config";
import DashboardSidebar from "@/components/dashboard/sidebar";
import DashboardHeader from "@/components/dashboard/header";
import { Suspense } from "react";

// Loading component for sidebar
function SidebarLoading() {
  return (
    <div className="hidden lg:flex lg:w-64 lg:flex-col">
      <div className="flex flex-col h-full bg-white border-r border-gray-200">
        <div className="flex items-center h-16 px-6 border-b border-gray-200">
          <div className="w-32 h-8 bg-gray-200 animate-pulse rounded"></div>
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
    </div>
  );
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId) {
    redirect("/sign-in");
  }

  // Check if user email is in admin whitelist
  if (
    user?.emailAddresses[0]?.emailAddress &&
    !isAdminEmail(user.emailAddresses[0].emailAddress)
  ) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Access Denied
          </h1>
          <p className="text-gray-600">
            {`You don't have permission to access this area.`}
          </p>
        </div>
      </div>
    );
  }

  // Extract only serializable user data
  const userData = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.emailAddresses[0]?.emailAddress || "",
    imageUrl: user?.imageUrl || "",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Layout */}
      <div className="flex h-screen">
        {/* Sidebar with Suspense boundary */}
        <Suspense fallback={<SidebarLoading />}>
          <div className="hidden lg:flex lg:w-64 lg:flex-col">
            <DashboardSidebar />
          </div>
        </Suspense>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <DashboardHeader userData={userData} />

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center h-32">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                  }
                >
                  {children}
                </Suspense>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
