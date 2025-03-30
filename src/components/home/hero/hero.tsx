import CurtainAnimation from "./curtain_animation";
import TextAnimation from "./text_animation";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const serviceWords = [
    "Web Solutions",
    "Mobile Apps",
    "Branding",
    "eCommerce",
  ];

  return (
    <div className="w-full mb-20 lg:mb-24 xl:mb-40">
      <div className="absolute top-0 left-0 right-0 z-0 pointer-events-none">
        <CurtainAnimation
          primaryColor="#ffffff"
          secondaryColor="#3B82F6"
          className="h-[180px] lg:h-[200px] xl:h-[250px]"
          waveSpeed={10}
        />
      </div>

      <div className="w-full mt-16  flex flex-col items-center justify-center gap-6 lg:gap-7 xl:gap-10 z-50">
        <div className="w-full flex flex-col items-center justify-center">
          <h1 className="text-3xl lg:text-5xl xl:text-6xl text-center font-medium">
            Transforming Ideas into
          </h1>
          <div className="h-10 lg:h-14 xl:h-18 mt-4 w-full max-w-lg relative">
            <TextAnimation
              words={serviceWords}
              displayTime={3000}
              animationTime={200}
              className="text-blue-600 font-medium"
            />
          </div>
        </div>

        <div className="w-full px-3 lg:px-52 xl:px-96 xl:text-lg mt-5 lg:mt-8 xl:mt-5">
          <p className="text-center text-[rgb(57,60,69)]">
            Transform Your Digital Presence with Stunning Websites, Powerful
            Apps, and Data-Driven Marketing.
          </p>
        </div>

        <div className="w-full flex items-center justify-center">
          <button className="w-full md:w-auto py-2 px-6 lg:px-8 lg:py-3 xl:px-10 xl:py-3 bg-blue-600 xl:text-lg text-white flex items-center justify-center gap-2 lg:hover:bg-black cursor-pointer rounded-full transition-all duration-300">
            {"Let's Talk"} <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}
