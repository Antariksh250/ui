import DigitalMarketingSection from "@/components/home/digital-marketing/digital-marketing";
import Hero from "@/components/home/hero/hero";
import ServicesSection from "@/components/home/services-section.tsx/services";

export default function Home() {
  return (
    <div className="w-full h-full px-4 lg:px-4 xl:px-20">
      <Hero />
      <div className="w-full h-[1px] bg-slate-300"></div>
      <ServicesSection />
      <DigitalMarketingSection />
    </div>
  );
}
