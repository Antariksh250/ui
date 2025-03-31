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
      <div className="relative w-full h-[300px] lg:h-[400px] xl:h-[500px] flex flex-col lg:flex-row rounded-lg border border-slate-200 hover:shadow-lg transition-all duration-500 hover:translate-y-[-6px] group">
        {/* Image */}
        <div className="w-full h-full relative">
          <Image
            src={src}
            alt={title}
            fill
            sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 40vw, 40vw"
            className="object-cover rounded-lg"
          />
        </div>

        {/* Layer */}
        <div className="w-full h-full absolute top-0 left-0 bg-[rgba(27,27,27,0.8)] rounded-lg"></div>

        {/* Contents */}
        <div className="w-full h-full px-10 absolute top-0 left-0 flex flex-col items-start justify-center gap-5 lg:gap-8">
          <h3 className="text-xl lg:text-3xl xl:text-4xl font-medium text-white group-hover:text-blue-600 transition-colors duration-300">
            {title}
          </h3>

          <p className="xl:text-lg text-gray-300">{description}</p>

          <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center group-hover:bg-black group-hover:border-black transition-all duration-300 transform group-hover:scale-110">
            <ArrowRight className="w-5 h-5 text-white group-hover:text-white transition-colors duration-300" />
          </div>
        </div>
      </div>
    </Link>
  );
}
