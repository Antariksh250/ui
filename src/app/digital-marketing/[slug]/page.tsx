import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMarketingServiceBySlug } from "@/data/digital-marketing";
import Hero from "@/components/services/hero/hero";
import MarketingBanner from "@/components/digital-marketing/slug/banner";
import MarketingWhyChooseUs from "@/components/digital-marketing/slug/why-choose-us";
import MarketingApproach from "@/components/digital-marketing/slug/approach";
import MarketingProcess from "@/components/digital-marketing/slug/process";
import MarketingVisual from "@/components/digital-marketing/slug/marketing-visual";
import Contact from "@/components/home/contact/contact";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getMarketingServiceBySlug(slug);

  if (!service) {
    return {
      title: "Marketing Service Not Found | Antariksh",
      description:
        "The requested digital marketing service could not be found.",
    };
  }

  return {
    title: `${service.title} | Antariksh - Digital Marketing Solutions`,
    description: service.shortDescription,
  };
}

export default async function MarketingServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getMarketingServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="w-full h-full px-4 lg:px-4 xl:px-20">
      <Hero title={service.title} subtitle={service.fullDescription} />

      <MarketingBanner image={service.bannerImage} alt={service.title} />

      <MarketingWhyChooseUs content={service.whyChooseUs} />

      <MarketingApproach
        content={service.howWeAccomplish}
        features={service.features}
      />

      <MarketingVisual category={service.category} />

      <MarketingProcess process={service.process} />

      <Contact />
    </div>
  );
}
