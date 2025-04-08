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

const addNewTestFormSchema = z.object({
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

export default function ContactForm() {
  const [isSubmittingForm, setIsSubmittingForm] = useState<boolean>(false);

  const form = useForm<z.infer<typeof addNewTestFormSchema>>({
    resolver: zodResolver(addNewTestFormSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      companyName: "",
      query: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof addNewTestFormSchema>) => {
    try {
      setIsSubmittingForm(true);

      console.log(values);

      //   const URI = `${process.env.NEXT_PUBLIC_API_URL}/exam`;
      //   const body = {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(values),
      //   };

      //   const response = await fetch(URI, body);

      //   if (!response.ok) {
      //     const errorData = await response.json();
      //     throw new Error(errorData.message || "Failed to create question");
      //   }

      // const data = await response.json();
      // console.log(data);

      form.reset();
      toast.success("A new test has been created");
    } catch (error) {
      console.log(error);
      toast.error(
        `Error: ${
          error instanceof Error ? error.message : "Something went wrong"
        }`
      );
    } finally {
      setIsSubmittingForm(false);
    }
  };

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
                    className="h-10 lg:h-12 text-sm lg:text-md"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* button */}
          <Button
            type="submit"
            disabled={
              Object.keys(form.formState.dirtyFields).length < 5 ||
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
