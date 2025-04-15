import {
  Search,
  BarChart4,
  MessageCircle,
  Mail,
  Target,
  CreditCard,
  FileText,
  LineChart,
  ArrowUpRight,
  Layers,
} from "lucide-react";

type MarketingVisualProps = {
  category: string;
};

export default function MarketingVisual({ category }: MarketingVisualProps) {
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "seo":
        return <Search className="w-6 h-6" />;
      case "ppc":
        return <CreditCard className="w-6 h-6" />;
      case "social":
        return <MessageCircle className="w-6 h-6" />;
      case "email":
        return <Mail className="w-6 h-6" />;
      case "lead gen":
        return <Target className="w-6 h-6" />;
      case "content":
        return <FileText className="w-6 h-6" />;
      case "cro":
        return <LineChart className="w-6 h-6" />;
      case "branding":
        return <Layers className="w-6 h-6" />;
      case "strategy":
      default:
        return <BarChart4 className="w-6 h-6" />;
    }
  };

  const getCategoryColor = (category: string): string => {
    switch (category.toLowerCase()) {
      case "seo":
        return "bg-blue-100 text-blue-600";
      case "ppc":
        return "bg-purple-100 text-purple-600";
      case "social":
        return "bg-green-100 text-green-600";
      case "email":
        return "bg-orange-100 text-orange-600";
      case "lead gen":
        return "bg-red-100 text-red-600";
      case "content":
        return "bg-indigo-100 text-indigo-600";
      case "cro":
        return "bg-yellow-100 text-yellow-700";
      case "branding":
        return "bg-pink-100 text-pink-600";
      case "strategy":
      default:
        return "bg-teal-100 text-teal-600";
    }
  };

  const marketingData = [
    {
      title: "Strategic Planning",
      description: "Research-backed strategy aligned with business goals",
      value: "30%",
      icon: <BarChart4 className="w-5 h-5" />,
    },
    {
      title: "Target Audience Focus",
      description: "Precise targeting of ideal customer segments",
      value: "2.4x",
      icon: <Target className="w-5 h-5" />,
    },
    {
      title: "Continuous Optimization",
      description: "Data-driven improvements for maximum ROI",
      value: "80%",
      icon: <LineChart className="w-5 h-5" />,
    },
    {
      title: "Measurable Results",
      description: "Transparent reporting and performance analytics",
      value: "100%",
      icon: <ArrowUpRight className="w-5 h-5" />,
    },
  ];

  return (
    <section className="w-full py-16 bg-slate-50 my-16 rounded-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-start lg:text-center mb-12">
          <div className="inline-flex items-center justify-center mb-4">
            <span
              className={`p-3 rounded-full ${getCategoryColor(category)} mr-3`}
            >
              {getCategoryIcon(category)}
            </span>
            <h2 className="text-3xl font-medium text-[rgb(57,60,69)]">
              {category} Marketing
            </h2>
          </div>
          <p className="max-w-2xl mx-auto lg:text-xl text-gray-500">
            Our data-driven approach delivers exceptional results through
            strategic implementation
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {marketingData.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-md bg-blue-50 text-blue-600 mr-3">
                  {item.icon}
                </div>
                <h3 className="text-lg font-medium text-[rgb(57,60,69)]">
                  {item.title}
                </h3>
              </div>
              <p className="text-gray-500 mb-3">{item.description}</p>
              {item.value && (
                <div className="flex justify-end">
                  <span className="text-2xl font-bold text-blue-600">
                    {item.value}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-start lg:text-center">
          <div className="inline-flex items-center justify-center p-1 px-3 bg-blue-50 rounded-full">
            <span className="text-sm font-medium text-blue-600">
              Industry-leading expertise
            </span>
          </div>
          <h2 className="mt-4 text-3xl font-medium text-[rgb(57,60,69)]">
            Maximizing Your Digital Potential
          </h2>
          <p className="mt-4 max-w-2xl mx-auto lg:text-xl text-gray-500">
            {`Our comprehensive ${category} marketing services are designed to help your business thrive in today's competitive digital landscape`}
          </p>
        </div>
      </div>
    </section>
  );
}
