import { NextRequest, NextResponse } from "next/server";
import { getContactFormsData } from "@/lib/fetchQueries";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status") || undefined;
    const search = searchParams.get("search") || undefined;

    // Use the same reusable function as server components
    const result = await getContactFormsData({
      page,
      limit,
      status,
      search,
    });

    // Handle authentication/authorization errors
    if (!result.success) {
      const statusCode =
        result.error === "Unauthorized"
          ? 401
          : result.error === "Access denied - Admin privileges required"
          ? 403
          : 500;

      return NextResponse.json({ error: result.error }, { status: statusCode });
    }

    // Return the data (same structure as before)
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: "Failed to fetch contact forms" },
      { status: 500 }
    );
  }
}
