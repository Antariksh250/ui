import About from "@/components/home/about/about";
import Contact from "@/components/home/contact/contact";
import DigitalMarketing from "@/components/home/digital-marketing/digital-marketing";
import Hero from "@/components/home/hero/hero";
import Services from "@/components/home/services.tsx/services";

export default function Home() {
  return (
    <div className="w-full h-full px-4 lg:px-4 xl:px-20">
      <Hero />
      <div className="w-full h-[1px] bg-slate-300"></div>
      <Services />
      <DigitalMarketing />
      <About />
      <div className="w-full h-[1px] bg-slate-300"></div>
      <Contact />
    </div>
  );
}
