import React from "react";
import Image from "next/image";
import CustomHeading from "@/components/custom-heading/custom-heading";
import CustomOutlinedIconLink from "@/components/custom-outlined-icon-link/custom-outlined-icon-link";

interface ServiceCardPropType {
  id: number;
  src: string;
  title: string;
  description: string;
  linkTitle: string;
  linkHref: string;
}

export default function ServiceCard({
  id,
  src,
  title,
  description,
  linkTitle,
  linkHref,
}: ServiceCardPropType) {
  return (
    <div className="w-full flex flex-col md:flex-row items-start justify-between gap-8 md:gap-12 xl:gap-20">
      {/* Image section - order depends on even/odd ID */}
      <div
        className={`w-full md:w-1/2 lg:w-4/5 ${
          id % 2 === 0 ? "md:order-1" : "md:order-2"
        }`}
      >
        <div className="relative w-full aspect-[4/3] md:aspect-[16/10] lg:aspect-[16/9] max-w-lg md:max-w-xl lg:max-w-2xl mx-auto">
          <Image
            src={src}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 80vw"
            className="object-contain rounded-md"
          />
        </div>
      </div>

      {/* Content section */}
      <div
        className={`w-full md:w-1/2 lg:w1/5 xl:px-20 flex flex-col justify-center gap-6 xl:gap-10 ${
          id % 2 === 0 ? "md:order-2" : "md:order-1"
        }`}
      >
        <CustomHeading heading={title} />
        <p className="mb-6 xl:text-lg text-[rgb(57,60,69)]">{description}</p>
        <div>
          <CustomOutlinedIconLink linkTitle={linkTitle} linkHref={linkHref} />
        </div>
      </div>
    </div>
  );
}
