"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const contactFormSchema = z.object({
  fullName: z
    .string()
    .min(6, {
      message: "Full name must be at least 6 characters.",
    })
    .max(60, { message: "Full name must have less than 60 characters" }),
  phoneNumber: z
    .string()
    .length(10, {
      message: "Phone number must be exactly 10 digits.",
    })
    .regex(/^\d+$/, {
      message: "Phone number must contain only numbers.",
    }),
  email: z
    .string()
    .email({
      message: "Please enter a valid email address.",
    })
    .min(6, {
      message: "Email must be at least 6 characters.",
    })
    .max(60, { message: "Email must have less than 60 characters" }),
  companyName: z
    .string()
    .min(6, {
      message: "Company name must be at least 6 characters.",
    })
    .max(60, { message: "Company name must have less than 60 characters" }),
  query: z.string().max(500, {
    message: "Query must not exceed 500 characters.",
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
  const [isSubmittingForm, setIsSubmittingForm] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      companyName: "",
      query: "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    try {
      setIsSubmittingForm(true);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit form");
      }

      // Reset form and show success message
      form.reset();
      setFormSubmitted(true);
      toast.success(
        "Your message has been sent successfully. We'll be in touch soon!"
      );
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        `Error: ${
          error instanceof Error ? error.message : "Something went wrong"
        }`
      );
    } finally {
      setIsSubmittingForm(false);
    }
  };

  // Show a success message after form submission
  if (formSubmitted) {
    return (
      <div className="w-full p-6 bg-green-50 rounded-lg text-center">
        <h3 className="text-xl font-medium text-green-800 mb-3">
          Thank You for Contacting Us!
        </h3>
        <p className="text-green-700 mb-6">
          {`Your message has been received. We'll get back to you shortly.`}
        </p>
        <Button
          type="button"
          onClick={() => setFormSubmitted(false)}
          className="bg-green-600 hover:bg-green-700"
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col items-center justify-center gap-10"
        >
          {/* Full name */}
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Full Name *"
                    className="h-10 lg:h-12 text-sm lg:text-md"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone number */}
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Phone Number *"
                    className="h-10 lg:h-12 text-sm lg:text-md"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Email *"
                    className="h-10 lg:h-12 text-sm lg:text-md"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Company Name */}
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Company Name *"
                    className="h-10 lg:h-12 text-sm lg:text-md"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Query */}
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Textarea
                    placeholder="How can we help you?"
                    className="min-h-[100px] text-sm lg:text-md"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit button */}
          <Button
            type="submit"
            disabled={
              Object.keys(form.formState.dirtyFields).length < 4 ||
              isSubmittingForm
            }
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition disabled:bg-indigo-500 disabled:cursor-not-allowed"
          >
            {isSubmittingForm ? (
              <>
                <Loader2 className="animate-spin mr-2" />
                Submitting...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}
