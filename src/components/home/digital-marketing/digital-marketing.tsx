import Link from "next/link";
import Card from "./card";
import { digitalMarketingCardArray } from "@/utils/utils.arrays";
import CustomHeading from "@/components/custom-heading/custom-heading";
import { ArrowRight } from "lucide-react";

const title = "Our Digital Marketing Services";
const subtitle =
  "We deliver comprehensive digital marketing solutions to help your business grow online.";

export default function DigitalMarketing() {
  return (
    <section className="w-full py-16 md:py-24 px-4 md:px-8 lg:px-16 mt-[20px] lg:mt-3 xl:mt-28 flex flex-col items-start justify-center gap-10">
      <div>
        <CustomHeading heading={title} />
      </div>

      <div>
        <p className="xl:text-lg text-[rgb(57,60,69)]">{subtitle}</p>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {digitalMarketingCardArray.map((service) => (
          <Card
            key={service.id}
            id={service.id}
            src={service.src}
            title={service.title}
            description={service.description}
            linkHref={service.linkHref}
          />
        ))}
      </div>

      <div className="w-full flex items-center justify-center xl:mt-10">
        <Link
          href={"/services"}
          className="w-auto px-6 py-3 text-2xl text-[rgb(57,60,69)] font-medium inline-flex items-center justify-center gap-5 group"
        >
          <span className="inline-block">
            SHOW ALL DIGITAL MARKETING SERVICES
          </span>
          <ArrowRight />
        </Link>
      </div>
    </section>
  );
}
