import Introduction from "@/components/about/introduction";
import Values from "@/components/about/values";
import Contact from "@/components/services/contact/contact";
import Hero from "@/components/services/hero/hero";
import Location from "@/components/about/location";

const title = "About Us";
const subtitle =
  "At Antariksh, we thrive on solving complex problems and redefining industry standards.";

export default function Page() {
  return (
    <div className="w-full h-full px-4 lg:px-4 xl:px-20">
      <Hero title={title} subtitle={subtitle} />
      <Introduction />
      <Values />
      <Location />
      <Contact />
    </div>
  );
}
