import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
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
  submittedAt?: {
    $gte?: Date;
    $lte?: Date;
  };
}

// Define the structure of a contact form document
interface ContactFormDocument {
  _id: mongoose.Types.ObjectId;
  fullName: string;
  email: string;
  phoneNumber: string;
  companyName: string;
  query?: string;
  status: string;
  submittedAt: Date;
  ipAddress?: string;
  userAgent?: string;
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

  if (!userId) {
    return { error: "Unauthorized", status: 401 };
  }

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
    const format = searchParams.get("format") || "csv";
    const status = searchParams.get("status");
    const search = searchParams.get("search");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

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

    if (startDate || endDate) {
      query.submittedAt = {};
      if (startDate) {
        query.submittedAt.$gte = new Date(startDate);
      }
      if (endDate) {
        query.submittedAt.$lte = new Date(endDate);
      }
    }

    // Get all matching forms with proper typing
    const rawForms = await ContactForm.find(query)
      .sort({ submittedAt: -1 })
      .lean();

    const forms: ContactFormDocument[] = rawForms.map((form: unknown) => {
      const f = form as ContactFormDocument;
      return {
        _id: f._id,
        fullName: f.fullName,
        email: f.email,
        phoneNumber: f.phoneNumber,
        companyName: f.companyName,
        query: f.query,
        status: f.status,
        submittedAt: f.submittedAt,
        ipAddress: f.ipAddress,
        userAgent: f.userAgent,
      };
    });

    if (format === "csv") {
      // Generate CSV
      const csvHeaders = [
        "ID",
        "Full Name",
        "Email",
        "Phone Number",
        "Company Name",
        "Query",
        "Status",
        "Submitted At",
        "IP Address",
        "User Agent",
      ];

      const csvRows = forms.map((form) => [
        form._id.toString(),
        `"${form.fullName}"`,
        form.email,
        form.phoneNumber,
        `"${form.companyName}"`,
        `"${(form.query || "").replace(/"/g, '""')}"`,
        form.status,
        new Date(form.submittedAt).toISOString(),
        form.ipAddress || "",
        `"${(form.userAgent || "").replace(/"/g, '""')}"`,
      ]);

      const csvContent = [
        csvHeaders.join(","),
        ...csvRows.map((row) => row.join(",")),
      ].join("\n");

      const fileName = `contact-queries-${
        new Date().toISOString().split("T")[0]
      }.csv`;

      return new NextResponse(csvContent, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="${fileName}"`,
        },
      });
    } else if (format === "json") {
      // Generate JSON
      const fileName = `contact-queries-${
        new Date().toISOString().split("T")[0]
      }.json`;

      return new NextResponse(JSON.stringify(forms, null, 2), {
        headers: {
          "Content-Type": "application/json",
          "Content-Disposition": `attachment; filename="${fileName}"`,
        },
      });
    }

    return NextResponse.json(
      { error: "Unsupported format. Use 'csv' or 'json'" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error exporting contact forms:", error);
    return NextResponse.json(
      { error: "Failed to export contact forms" },
      { status: 500 }
    );
  }
}
