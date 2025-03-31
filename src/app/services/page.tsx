import Contact from "@/components/services/contact/contact";
import Hero from "@/components/services/hero/hero";
import ServiceDisplay from "@/components/services/service-display/service-display";

export default function Page() {
  return (
    <div className="w-full h-full px-4 lg:px-4 xl:px-20">
      <Hero />
      <ServiceDisplay />
      <Contact />
    </div>
  );
}
