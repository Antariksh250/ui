type ProcessCardPropType = {
  step: number;
  title: string;
  description: string;
};

export default function ProcessCard({
  step,
  title,
  description,
}: ProcessCardPropType) {
  return (
    <div className="p-8 bg-white rounded-lg border border-slate-200 hover:shadow-lg transition-all duration-300">
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 text-white text-xl font-semibold mb-6">
        {step}
      </div>
      <h3 className="text-xl font-medium text-[rgb(57,60,69)] mb-4">{title}</h3>
      <p className="text-[rgb(57,60,69)]">{description}</p>
    </div>
  );
}
