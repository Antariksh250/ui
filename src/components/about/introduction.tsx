import Image from "next/image";
import CustomHeading from "@/components/custom-heading/custom-heading";
import CustomOutlinedIconLink from "@/components/custom-outlined-icon-link/custom-outlined-icon-link";

const title = "Who We Are -";
const aboutDescription =
  "We are a trusted technology partner, delivering cutting-edge web solutions with a commitment to innovation and excellence. Our expertise spans across web development, application design, and digital marketing, ensuring businesses thrive in the digital landscape.";

export default function About() {
  return (
    <section className="w-full py-16 md:py-24 mt-[20px] lg:mt-3 xl:mt-28 xl:mb-20 flex flex-col items-center justify-center gap-10 xl:gap-16">
      <div className="w-full flex items-center justify-start">
        <CustomHeading heading={title} />
      </div>

      <div className="w-full flex flex-col lg:flex-row items-center xl:items-start justify-center lg:justify-between gap-7 lg:gap-16">
        {/* Mobile image - only shown on mobile, hidden on md screens and up */}
        <div className="block lg:hidden w-full">
          <div className="relative w-full aspect-[4/3] md:aspect-[16/10] lg:aspect-[16/9]">
            <Image
              src="/images/about-us.webp"
              alt="Team meeting"
              fill
              sizes="100vw"
              className="object-cover rounded-md"
            />
          </div>
        </div>

        {/* Right column (Text content) */}
        <div className="w-full lg:w-1/2 lg:h-full flex flex-col items-center justify-center lg:justify-between gap-6 lg:gap-8">
          <p className="text-[rgb(57,60,69)] xl:text-lg">{aboutDescription}</p>

          <div className="w-full mt-7">
            <CustomOutlinedIconLink
              linkTitle="Let's talk"
              linkHref="/contact"
            />
          </div>
        </div>

        {/* Left column (Image) - Hidden on mobile, shown on md screens and up */}
        <div className="hidden lg:block lg:w-1/2">
          <div className="relative w-full aspect-[4/3]">
            <Image
              src="/images/about-us.webp"
              alt="intro"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 60vw"
              className="object-cover rounded-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
