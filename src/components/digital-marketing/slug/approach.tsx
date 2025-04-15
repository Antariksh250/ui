import CustomHeading from "@/components/custom-heading/custom-heading";

type MarketingApproachPropType = {
  content: string;
  features: string[];
};

export default function MarketingApproach({
  content,
  features,
}: MarketingApproachPropType) {
  return (
    <section className="w-full py-5 md:py-10 mt-[20px] lg:mt-3 xl:mt-10 xl:mb-20 flex flex-col items-start justify-center gap-10 xl:gap-16">
      <div className="lg:col-span-4">
        <CustomHeading heading="Our Approach" />
      </div>

      <div>
        <p className="xl:text-lg text-[rgb(57,60,69)] mb-8">{content}</p>
      </div>

      <div className="">
        <h3 className="text-xl lg:text-4xl text-[rgb(57,60,69)] mb-6 lg:mb-10 font-medium">
          Key Features
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 xl:gap-12">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start lg:text-xl">
              <span className="inline-flex items-center justify-center w-7 h-7 lg:w-10 lg:h-10 rounded-full bg-blue-100 text-blue-600 mr-3 mt-0.5">
                {index + 1}
              </span>
              <span className="text-[rgb(57,60,69)]">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
