import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectToDatabase from "@/lib/mongodb";
import ContactForm from "@/models/contact-form";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await connectToDatabase();

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const form = await ContactForm.findById(id).lean();

    if (!form) {
      return NextResponse.json(
        { error: "Contact form not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: form,
    });
  } catch (error) {
    console.error("Error fetching contact form:", error);
    return NextResponse.json(
      { error: "Failed to fetch contact form" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await connectToDatabase();

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const body = await request.json();
    const { status } = body;

    // Validate status
    const validStatuses = ["new", "in-progress", "completed", "archived"];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        {
          error: "Invalid status. Must be one of: " + validStatuses.join(", "),
        },
        { status: 400 }
      );
    }

    const updatedForm = await ContactForm.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    ).lean();

    if (!updatedForm) {
      return NextResponse.json(
        { error: "Contact form not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedForm,
      message: "Status updated successfully",
    });
  } catch (error) {
    console.error("Error updating contact form:", error);
    return NextResponse.json(
      { error: "Failed to update contact form" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await connectToDatabase();

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const deletedForm = await ContactForm.findByIdAndDelete(id);

    if (!deletedForm) {
      return NextResponse.json(
        { error: "Contact form not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Contact form deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting contact form:", error);
    return NextResponse.json(
      { error: "Failed to delete contact form" },
      { status: 500 }
    );
  }
}
