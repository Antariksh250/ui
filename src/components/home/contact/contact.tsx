import { ArrowRight } from "lucide-react";
import CustomHeading from "@/components/custom-heading/custom-heading";
import Link from "next/link";

const title = "Take the Leap Forward with Antariksh";

export default function Contact() {
  return (
    <section className="w-full py-16 md:py-24 px-4 md:px-8 lg:px-16 mt-[20px] lg:mt-3 xl:mt-28 xl:mb-28 flex flex-col items-center justify-center gap-8">
      <CustomHeading heading={title} textAlign="text-center" />
      <p className="text-[rgb(57,60,69)] xl:text-lg">Ready to get started?</p>
      <div className="w-full flex items-center justify-center">
        <Link
          href={"/contact"}
          className="w-full md:w-auto py-2 px-6 lg:px-8 lg:py-3 xl:px-10 xl:py-3 bg-blue-600 xl:text-lg text-white flex items-center justify-center gap-2 lg:hover:bg-black cursor-pointer rounded-full transition-all duration-300"
        >
          {"Let's Talk"} <ArrowRight />
        </Link>
      </div>
    </section>
  );
}
