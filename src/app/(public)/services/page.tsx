import type { Metadata } from "next";
import Contact from "@/components/services/contact/contact";
import Hero from "@/components/services/hero/hero";
import ServiceDisplay from "@/components/services/service-display/service-display";

export const metadata: Metadata = {
  title: "Our Services | Antariksh - Custom Software & Digital Solutions",
  description:
    "Explore a wide range of services at Antariksh — from full-stack web development and mobile apps to cloud solutions and digital marketing. Tailored tech for every business need.",
};

const title = "Our Services";
const subtitle =
  "Helping organizations scale and thrive by leveraging proven strategies, cutting-edge tools, and seamless processes that drive efficiency, foster innovation, and ensure long-term success in a competitive landscape.";

export default function Page() {
  return (
    <div className="w-full h-full px-4 lg:px-4 xl:px-20">
      <Hero title={title} subtitle={subtitle} />
      <ServiceDisplay />
      <Contact />
    </div>
  );
}
