import { NextRequest, NextResponse } from "next/server";
import ContactForm, { IContactForm } from "@/models/contact-form";
import connectToDatabase from "@/lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Parse the request body
    const body = await request.json();

    // Extract form data
    const { fullName, phoneNumber, email, companyName, query } = body;

    // Basic validation
    if (!fullName || !phoneNumber || !email || !companyName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get client IP and user agent for analytics
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIP = request.headers.get("x-real-ip");

    // Parse IP address - x-forwarded-for might contain multiple IPs separated by commas
    let ipAddress: string | undefined;
    if (forwardedFor) {
      // Take the first IP from x-forwarded-for if it exists
      const ips = forwardedFor.split(",");
      ipAddress = ips[0]?.trim();
    } else if (realIP) {
      ipAddress = realIP.trim();
    }

    // Validate IP format using the same regex as in the schema
    const ipv4Regex =
      /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
    const isValidIP =
      ipAddress && (ipv4Regex.test(ipAddress) || ipv6Regex.test(ipAddress));

    const userAgent = request.headers.get("user-agent") || undefined;

    // Create a new contact form submission
    const contactFormData: Partial<IContactForm> = {
      fullName,
      phoneNumber,
      email,
      companyName,
      query: query || "",
      submittedAt: new Date(),
      status: "new" as const,
    };

    // Only include IP address and user agent if they're valid
    if (isValidIP) {
      contactFormData.ipAddress = ipAddress;
    }

    if (userAgent) {
      contactFormData.userAgent = userAgent;
    }

    // Use the model to create a new document - this handles both creation and saving
    const newContactForm = await ContactForm.create(contactFormData);

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Form submitted successfully",
        id: newContactForm._id,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error handling contact form submission:", error);

    // Check if it's a MongoDB validation error
    if (
      error instanceof Error &&
      error.name === "ValidationError" &&
      "errors" in error
    ) {
      const validationError = error as {
        errors: Record<string, { message: string }>;
      };
      const validationErrors = Object.values(validationError.errors).map(
        (err) => err.message
      );

      return NextResponse.json(
        { error: "Validation failed", details: validationErrors },
        { status: 400 }
      );
    }

    // Handle connection errors
    if (error instanceof Error) {
      if (
        error.message.includes("ENOTFOUND") ||
        error.message.includes("connection")
      ) {
        return NextResponse.json(
          {
            error: "Database connection failed",
            details: "Please try again later",
          },
          { status: 503 }
        );
      }

      if (error.message.includes("timeout")) {
        return NextResponse.json(
          { error: "Request timeout", details: "Please try again later" },
          { status: 408 }
        );
      }
    }

    return NextResponse.json(
      {
        error: "Failed to submit form",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
