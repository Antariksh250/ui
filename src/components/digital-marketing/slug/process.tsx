import CustomHeading from "@/components/custom-heading/custom-heading";

type ProcessStep = {
  step: number;
  title: string;
  description: string;
};

type MarketingProcessPropType = {
  process: ProcessStep[];
};

export default function MarketingProcess({
  process,
}: MarketingProcessPropType) {
  return (
    <section className="w-full py-16 md:py-24 mt-[20px] lg:mt-3 xl:mt-28 xl:mb-20 flex flex-col items-start justify-center gap-10 xl:gap-16">
      <CustomHeading heading="Our Process" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {process.map((step) => (
          <div
            key={step.step}
            className="p-8 bg-white rounded-lg border border-slate-200 hover:shadow-lg transition-all duration-300"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 text-white text-xl font-semibold mb-6">
              {step.step}
            </div>
            <h3 className="text-xl font-medium text-[rgb(57,60,69)] mb-4">
              {step.title}
            </h3>
            <p className="text-[rgb(57,60,69)]">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
