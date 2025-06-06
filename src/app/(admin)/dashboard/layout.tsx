import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isAdminEmail } from "@/lib/admin-config";

export default async function AdminLayout({
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600">
            {`You don't have permission to access this area.`}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Admin Panel</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            {user?.emailAddresses[0]?.emailAddress}
          </span>
          {/* Add UserButton later */}
        </div>
      </nav>
      <main className="p-6">{children}</main>
    </div>
  );
}
