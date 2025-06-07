import { NextResponse } from "next/server";
import { isAdminEmail } from "@/lib/admin-config";
import {
  clerkMiddleware,
  createRouteMatcher,
  clerkClient,
} from "@clerk/nextjs/server";

// Separate route matchers for different protection levels
const isProtectedPageRoute = createRouteMatcher(["/dashboard(.*)", "/admin"]);
const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);
const isProtectedApiRoute = createRouteMatcher([
  "/api/contact-forms(.*)",
  "/api/admin(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  // Allow public routes
  if (isPublicRoute(req)) {
    return;
  }

  // Handle protected page routes
  if (isProtectedPageRoute(req)) {
    await auth.protect();

    const { userId } = await auth();
    const currentUser = userId
      ? await (await clerkClient()).users.getUser(userId)
      : null;

    const userEmail = currentUser?.emailAddresses?.[0]?.emailAddress;

    if (!userEmail || !isAdminEmail(userEmail)) {
      return new Response("Access Denied", { status: 403 });
    }
  }

  // Handle protected API routes with different logic
  if (isProtectedApiRoute(req)) {
    try {
      // For API routes, we need to handle auth differently
      const { userId } = await auth();

      if (!userId) {
        return NextResponse.json(
          { error: "Unauthorized - Please sign in" },
          { status: 401 }
        );
      }

      // Get user info for admin check
      const currentUser = await (await clerkClient()).users.getUser(userId);
      const userEmail = currentUser?.emailAddresses?.[0]?.emailAddress;

      if (!userEmail || !isAdminEmail(userEmail)) {
        return NextResponse.json(
          { error: "Access Denied - Admin privileges required" },
          { status: 403 }
        );
      }

      // If we get here, the user is authenticated and authorized
      // Let the request continue to the API route
    } catch (error) {
      console.error("Middleware auth error:", error);
      return NextResponse.json(
        { error: "Authentication failed" },
        { status: 401 }
      );
    }
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
