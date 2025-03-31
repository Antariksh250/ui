import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface CardPropType {
  id: number;
  src: string;
  title: string;
  description: string;
  linkHref: string;
}

export default function Card({
  src,
  title,
  description,
  linkHref,
}: CardPropType) {
  return (
    <Link href={linkHref} className="block h-full">
      <div className="relative h-full flex flex-col lg:flex-row p-6 lg:px-8 lg:py-10 bg-white rounded-lg border border-slate-200 hover:shadow-lg transition-all duration-500 hover:translate-y-[-6px] group">
        {/* Image */}
        <div className="w-full h-[180px] xl:h-full lg:w-2/5 mb-6 lg:mb-0 lg:mr-6 relative">
          <div className="w-full h-full relative">
            <Image
              src={src}
              alt={title}
              fill
              sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 40vw, 40vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Contents */}
        <div className="flex flex-col justify-between w-full lg:w-3/5">
          <h3 className="text-xl lg:text-2xl font-medium mb-3 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
            {title}
          </h3>

          <p className="xl:text-lg text-gray-600 mb-4 flex-grow mt-5">
            {description}
          </p>

          <div className="self-end mt-auto">
            <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center group-hover:bg-black group-hover:border-black transition-all duration-300 transform group-hover:scale-110">
              <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-300" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
