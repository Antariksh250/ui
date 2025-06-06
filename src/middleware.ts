import { isAdminEmail } from "@/lib/admin-config";
import {
  clerkMiddleware,
  createRouteMatcher,
  clerkClient,
} from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/admin"]);
const isPublicRoute = createRouteMatcher(["/sign-in(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // Fetch current user if logged in
  const currentUser = userId
    ? await (await clerkClient()).users.getUser(userId)
    : null;

  if (isPublicRoute(req)) {
    return;
  }

  if (isProtectedRoute(req)) {
    await auth.protect();

    // Extract email from currentUser instead of sessionClaims
    const userEmail = currentUser?.emailAddresses?.[0]?.emailAddress;

    if (!userEmail || !isAdminEmail(userEmail)) {
      return new Response("Access Denied", { status: 403 });
    }
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
