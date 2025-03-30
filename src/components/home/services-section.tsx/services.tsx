import React from "react";
import Link from "next/link";
import ServiceCard from "./service-card";
import { servicesCardArray } from "@/utils/utils.arrays";
import { ArrowRight } from "lucide-react";

const ServicesSection: React.FC = () => {
  return (
    <section className="w-full py-16 md:py-24 px-4 md:px-8 lg:px-16">
      <div className="w-full mt-[20px] lg:mt-3 xl:mt-28 flex items-center justify-center flex-wrap gap-40 lg:gap-60 xl:gap-80">
        {servicesCardArray.map((service) => (
          <ServiceCard
            key={service.id}
            id={service.id}
            src={service.src}
            title={service.title}
            description={service.description}
            linkTitle={service.linkTitle}
            linkHref={service.linkHref}
          />
        ))}

        <div>
          <Link
            href={"/services"}
            className="w-auto px-6 py-3 text-2xl text-[rgb(57,60,69)] font-medium inline-flex items-center justify-center gap-5 group"
          >
            <span className="inline-block">SHOW ALL SERVICES</span>
            <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
