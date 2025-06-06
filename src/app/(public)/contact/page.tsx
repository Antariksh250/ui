import type { Metadata } from "next";
import Hero from "@/components/contact/hero";
import Location from "@/components/contact/location";

export const metadata: Metadata = {
  title: "Contact Us | Antariksh - Let's Build Something Great Together",
  description:
    "Get in touch with Antariksh for software development, web solutions, or digital consulting. We're here to answer your questions and help bring your ideas to life.",
};

export default function Page() {
  return (
    <div className="w-full h-full">
      <Hero />
      <Location />
    </div>
  );
}
