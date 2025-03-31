import { ArrowRight } from "lucide-react";
import CustomHeading from "@/components/custom-heading/custom-heading";

const title = "Take the Leap Forward with Antariksh";
const subtitle = "Got a big project in mind? We’d love to hear from you.";

export default function Contact() {
  return (
    <section className="w-full py-16 md:py-24 px-4 md:px-8 lg:px-16 mt-[20px] lg:mt-3 xl:mt-28 xl:mb-28 flex flex-col items-center justify-center gap-8">
      <CustomHeading heading={title} />
      <p className="text-[rgb(57,60,69)] xl:text-lg">{subtitle}</p>
      <div className="w-full flex items-center justify-center">
        <button className="w-full md:w-auto py-2 px-6 lg:px-8 lg:py-3 xl:px-10 xl:py-3 bg-blue-600 xl:text-lg text-white flex items-center justify-center gap-2 lg:hover:bg-black cursor-pointer rounded-full transition-all duration-300">
          {"Let's Talk"} <ArrowRight />
        </button>
      </div>
    </section>
  );
}
