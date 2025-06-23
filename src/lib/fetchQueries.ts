import { auth, currentUser } from "@clerk/nextjs/server";
import { isAdminEmail } from "@/lib/admin-config";
import ContactForm from "@/models/contact-form";
import connectToDatabase from "@/lib/mongodb";

// Types
interface ContactFormQuery {
  status?: string;
  $or?: Array<{
    [key: string]: {
      $regex: string;
      $options: string;
    };
  }>;
}

interface ContactFormData {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  companyName: string;
  query: string;
  status: "new" | "in-progress" | "completed" | "archived";
  submittedAt: string;
}

interface ContactFormStats {
  total: number;
  new: number;
  inProgress: number;
  completed: number;
  archived: number;
}

interface ContactFormsResponse {
  success: boolean;
  data?: {
    forms: ContactFormData[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
    stats: ContactFormStats;
  };
  error?: string;
}

// Main reusable function
export async function getContactFormsData(
  options: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
  } = {}
): Promise<ContactFormsResponse> {
  try {
    // Check authentication
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
      return {
        success: false,
        error: "Unauthorized",
        data: {
          forms: [],
          pagination: { page: 1, limit: 10, total: 0, pages: 0 },
          stats: { total: 0, new: 0, inProgress: 0, completed: 0, archived: 0 },
        },
      };
    }

    // Check admin permissions
    const userEmail = user.emailAddresses?.[0]?.emailAddress;
    if (!userEmail || !isAdminEmail(userEmail)) {
      return {
        success: false,
        error: "Access denied - Admin privileges required",
        data: {
          forms: [],
          pagination: { page: 1, limit: 10, total: 0, pages: 0 },
          stats: { total: 0, new: 0, inProgress: 0, completed: 0, archived: 0 },
        },
      };
    }

    // Connect to database
    await connectToDatabase();

    // Extract options with defaults
    const { page = 1, limit = 10, status, search } = options;

    // Build query
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

    // Fetch data
    const [forms, total, statusCounts] = await Promise.all([
      ContactForm.find(query)
        .sort({ submittedAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
        .exec(),
      ContactForm.countDocuments(query).exec(),
      ContactForm.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ]).exec(),
    ]);

    // Build stats
    const stats = {
      total,
      new: statusCounts.find((s) => s._id === "new")?.count || 0,
      inProgress: statusCounts.find((s) => s._id === "in-progress")?.count || 0,
      completed: statusCounts.find((s) => s._id === "completed")?.count || 0,
      archived: statusCounts.find((s) => s._id === "archived")?.count || 0,
    };

    return {
      success: true,
      data: {
        forms: forms.map((form) => ({
          _id: (form._id as { toString: () => string }).toString(),
          fullName: form.fullName,
          email: form.email,
          companyName: form.companyName,
          phoneNumber: form.phoneNumber,
          query: form.query || "",
          status: form.status,
          submittedAt: form.submittedAt.toISOString(),
        })),
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
        stats,
      },
    };
  } catch (error) {
    console.error("Error fetching contact forms data:", error);
    return {
      success: false,
      error: "Failed to fetch contact forms data",
      data: {
        forms: [],
        pagination: { page: 1, limit: 10, total: 0, pages: 0 },
        stats: { total: 0, new: 0, inProgress: 0, completed: 0, archived: 0 },
      },
    };
  }
}

// Convenience functions
export async function getContactStats(): Promise<ContactFormStats> {
  const result = await getContactFormsData({ limit: 1 });
  return (
    result.data?.stats || {
      total: 0,
      new: 0,
      inProgress: 0,
      completed: 0,
      archived: 0,
    }
  );
}

export async function getRecentQueries(
  limit: number = 5
): Promise<ContactFormData[]> {
  const result = await getContactFormsData({ limit });
  return result.data?.forms || [];
}
