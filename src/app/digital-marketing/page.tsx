import Contact from "@/components/services/contact/contact";
import Hero from "@/components/services/hero/hero";
import ServiceDisplay from "@/components/digital-marketing/service-display/service-display";

const title = "Our Digital Marketing Services";
const subtitle =
  "Empowering businesses to grow and succeed through data-driven digital marketing strategies, advanced tools, and seamless execution that enhance visibility, drive engagement, and deliver long-term results in a dynamic digital landscape.";

export default function Page() {
  return (
    <div className="w-full h-full px-4 lg:px-4 xl:px-20">
      <Hero title={title} subtitle={subtitle} />
      <ServiceDisplay />
      <Contact />
    </div>
  );
}
