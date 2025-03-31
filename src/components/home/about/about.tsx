import Image from "next/image";
import CustomHeading from "@/components/custom-heading/custom-heading";
import CustomOutlinedIconLink from "@/components/custom-outlined-icon-link/custom-outlined-icon-link";

const title = "A Vision-Driven Team";
const aboutDescription =
  "Antariksh is a passionate team of designers, developers, engineers, project managers, and digital innovators. We work with forward-thinking companies worldwide, crafting technology that redefines the limits of design and software engineering";

export default function About() {
  return (
    <section className="w-full py-16 md:py-24 px-4 md:px-8 lg:px-16 mt-[20px] lg:mt-3 xl:mt-28 xl:mb-20 flex flex-col items-center justify-center">
      <div className="w-full flex items-center justify-start md:mb-2 xl:mb-14">
        <CustomHeading heading={title} />
      </div>

      <div className="w-full flex flex-col lg:flex-row items-center xl:items-start justify-center lg:justify-between gap-7 lg:gap-16">
        {/* Mobile image - only shown on mobile, hidden on md screens and up */}
        <div className="block lg:hidden w-full">
          <div className="relative w-full aspect-[4/3] md:aspect-[16/10] lg:aspect-[16/9]">
            <Image
              src="/images/lead-gen.webp"
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
            <CustomOutlinedIconLink linkTitle="About Us" linkHref="/about" />
          </div>
        </div>

        {/* Left column (Image) - Hidden on mobile, shown on md screens and up */}
        <div className="hidden lg:block lg:w-1/2">
          <div className="relative w-full aspect-[4/3]">
            <Image
              src="/images/lead-gen.webp"
              alt="Team meeting"
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
