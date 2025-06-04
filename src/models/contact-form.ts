import mongoose, { Document, Schema } from "mongoose";

export interface IContactForm extends Document {
  fullName: string;
  phoneNumber: string;
  email: string;
  companyName: string;
  query?: string;
  submittedAt: Date;
  status: "new" | "in-progress" | "completed" | "archived";
  ipAddress?: string;
  userAgent?: string;
}

// Check if the model is already defined to prevent model overwrite errors
// This is important in Next.js development with hot reloading
const ContactFormModel =
  mongoose.models.ContactForm ||
  mongoose.model<IContactForm>(
    "ContactForm",
    new Schema<IContactForm>(
      {
        fullName: {
          type: String,
          required: [true, "Full name is required"],
          trim: true,
          minlength: [6, "Full name must be at least 6 characters long"],
          maxlength: [60, "Full name must not exceed 60 characters"],
          validate: {
            validator: function (value: string) {
              // Check if name contains at least one letter and no special characters except spaces, hyphens, and apostrophes
              return /^[a-zA-Z\s\-']+$/.test(value) && /[a-zA-Z]/.test(value);
            },
            message:
              "Full name must contain only letters, spaces, hyphens, and apostrophes",
          },
        },

        phoneNumber: {
          type: String,
          required: [true, "Phone number is required"],
          trim: true,
          validate: {
            validator: function (value: string) {
              // Exactly 10 digits
              return /^\d{10}$/.test(value);
            },
            message: "Phone number must be exactly 10 digits",
          },
        },

        email: {
          type: String,
          required: [true, "Email is required"],
          trim: true,
          lowercase: true,
          minlength: [6, "Email must be at least 6 characters long"],
          maxlength: [60, "Email must not exceed 60 characters"],
          validate: {
            validator: function (value: string) {
              // Comprehensive email validation
              const emailRegex =
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
              return emailRegex.test(value);
            },
            message: "Please enter a valid email address",
          },
        },

        companyName: {
          type: String,
          required: [true, "Company name is required"],
          trim: true,
          minlength: [6, "Company name must be at least 6 characters long"],
          maxlength: [60, "Company name must not exceed 60 characters"],
          validate: {
            validator: function (value: string) {
              // Allow letters, numbers, spaces, and common business characters
              return /^[a-zA-Z0-9\s\-&.,()]+$/.test(value);
            },
            message: "Company name contains invalid characters",
          },
        },

        query: {
          type: String,
          trim: true,
          maxlength: [500, "Query must not exceed 500 characters"],
          default: "",
        },

        submittedAt: {
          type: Date,
          default: Date.now,
          required: true,
        },

        status: {
          type: String,
          enum: {
            values: ["new", "in-progress", "completed", "archived"],
            message:
              "Status must be one of: new, in-progress, completed, archived",
          },
          default: "new",
        },

        // Optional fields for tracking and analytics
        ipAddress: {
          type: String,
          validate: {
            validator: function (value: string) {
              if (!value) return true; // Optional field
              // IPv4 or IPv6 validation
              const ipv4Regex =
                /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
              const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
              return ipv4Regex.test(value) || ipv6Regex.test(value);
            },
            message: "Invalid IP address format",
          },
        },

        userAgent: {
          type: String,
          maxlength: [500, "User agent string too long"],
        },
      },
      {
        timestamps: true, // Adds createdAt and updatedAt automatically
        collection: "contact_forms",
      }
    )
  );

// Pre-save middleware for additional validation
ContactFormModel.schema.pre("save", function (next) {
  // Ensure email is unique per company within last 24 hours to prevent spam
  if (this.isNew) {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    ContactFormModel.findOne({
      email: this.email,
      companyName: this.companyName,
      submittedAt: { $gte: twentyFourHoursAgo },
    })
      .then((existingForm) => {
        if (existingForm) {
          next(
            new Error(
              "A form with this email and company has already been submitted in the last 24 hours"
            )
          );
        } else {
          next();
        }
      })
      .catch(next);
  } else {
    next();
  }
});

export default ContactFormModel;
