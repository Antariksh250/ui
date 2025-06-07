import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { isAdminEmail } from "@/lib/admin-config";
import ContactForm from "@/models/contact-form";
import connectToDatabase from "@/lib/mongodb";

// Define types for the MongoDB query
interface ContactFormQuery {
  status?: string;
  $or?: Array<{
    [key: string]: {
      $regex: string;
      $options: string;
    };
  }>;
}

interface AuthCheckResult {
  error?: string;
  status?: number;
  success?: boolean;
}

// Middleware to check admin access
const checkAdminAccess = async (): Promise<AuthCheckResult> => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { error: "Unauthorized", status: 401 };
    }

    const user = await currentUser();
    const userEmail = user?.emailAddresses?.[0]?.emailAddress;

    if (!userEmail || !isAdminEmail(userEmail)) {
      return {
        error: "Access denied - Admin privileges required",
        status: 403,
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Auth check error:", error);
    return { error: "Authentication failed", status: 401 };
  }
};

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // Check admin access
    const authCheck = await checkAdminAccess();
    if (authCheck.error) {
      return NextResponse.json(
        { error: authCheck.error },
        { status: authCheck.status }
      );
    }

    // Connect to database
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    // Build query with proper typing
    const query: ContactFormQuery = {};

    if (status && status !== "all") {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { companyName: { $regex: search, $options: "i" } },
      ];
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Get forms with pagination
    const [forms, total, statusCounts] = await Promise.all([
      ContactForm.find(query)
        .sort({ submittedAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
        .exec(),
      ContactForm.countDocuments(query).exec(),
      ContactForm.aggregate([
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
      ]).exec(),
    ]);

    const stats = {
      total,
      new: statusCounts.find((s) => s._id === "new")?.count || 0,
      inProgress: statusCounts.find((s) => s._id === "in-progress")?.count || 0,
      completed: statusCounts.find((s) => s._id === "completed")?.count || 0,
      archived: statusCounts.find((s) => s._id === "archived")?.count || 0,
    };

    return NextResponse.json({
      success: true,
      data: {
        forms,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
        stats,
      },
    });
  } catch (error) {
    console.error("Error fetching contact forms:", error);

    // Return appropriate error based on error type
    if (error instanceof Error) {
      if (
        error.message.includes("ENOTFOUND") ||
        error.message.includes("connection")
      ) {
        return NextResponse.json(
          { error: "Database connection failed", details: error.message },
          { status: 503 }
        );
      }

      if (error.message.includes("timeout")) {
        return NextResponse.json(
          { error: "Database request timeout", details: error.message },
          { status: 408 }
        );
      }
    }

    return NextResponse.json(
      {
        error: "Failed to fetch contact forms",
        details: process.env.NODE_ENV === "development" ? error : undefined,
      },
      { status: 500 }
    );
  }
}
