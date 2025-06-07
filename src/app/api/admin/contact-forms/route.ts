import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import mongoose from "mongoose";
import ContactForm from "@/models/contact-form";

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

// Connect to MongoDB
const connectDB = async (): Promise<void> => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI || "");
    }
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Failed to connect to database");
  }
};

// Middleware to check admin access
const checkAdminAccess = async (): Promise<AuthCheckResult> => {
  const { userId } = await auth();
  const user = await currentUser();
  console.log("userId:", userId);
  console.log("user:", user);

  if (!userId) {
    return { error: "Unauthorized", status: 401 };
  }

  // You might need to fetch user data to get email
  // For now, assuming you have access to user email through your auth system
  // This would need to be adjusted based on your actual auth setup

  return { success: true };
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

    await connectDB();

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
    const forms = await ContactForm.find(query)
      .sort({ submittedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count for pagination
    const total = await ContactForm.countDocuments(query);

    // Get status counts for dashboard stats
    const statusCounts = await ContactForm.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
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
    return NextResponse.json(
      { error: "Failed to fetch contact forms" },
      { status: 500 }
    );
  }
}
