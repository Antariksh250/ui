import Image from "next/image";
import CustomHeading from "@/components/custom-heading/custom-heading";

const title = "Location";
const locationDescription =
  "Antariksh is based in Guwahati, a vibrant hub of innovation and growth in Northeast India. Our location enables us to collaborate seamlessly with businesses locally and globally.";

export default function Location() {
  return (
    <section className="w-full py-16 md:py-24 mt-[20px] lg:mt-3 xl:mt-28 xl:mb-20 flex flex-col items-center justify-center gap-10 xl:gap-16">
      <div className="w-full flex-start">
        <CustomHeading heading={title} />
      </div>

      <div className="grid w-full auto-rows-min grid-cols-6 gap-4 lg:grid-cols-12 lg:gap-x-8">
        <p className="xl:text-lg text-[rgb(57,60,69)] col-span-full lg:col-start-1 lg:col-end-7">
          {locationDescription}
        </p>
      </div>

      <div className="w-full">
        <div className="relative w-full aspect-[4/3] md:aspect-[16/10] lg:aspect-[16/9]">
          <Image
            src="/images/office.webp"
            alt="Team meeting"
            fill
            sizes="100vw"
            className="object-cover rounded-md"
          />
        </div>
      </div>
    </section>
  );
}
