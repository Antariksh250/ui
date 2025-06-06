import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/data/services";
import Hero from "@/components/services/hero/hero";
import ServiceBanner from "@/components/services/slug/banner";
import ServiceWhyChooseUs from "@/components/services/slug/why-choose-us";
import ServiceApproach from "@/components/services/slug/approach";
import ServiceProcess from "@/components/services/slug/process";
import Contact from "@/components/home/contact/contact";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found | Antariksh",
      description: "The requested service could not be found.",
    };
  }

  return {
    title: `${service.title} | Antariksh - Professional Digital Solutions`,
    description: service.shortDescription,
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="w-full h-full px-4 lg:px-4 xl:px-20">
      <Hero title={service.title} subtitle={service.fullDescription} />

      <ServiceBanner image={service.thumbnailImage} alt={service.title} />

      <ServiceWhyChooseUs content={service.whyChooseUs} />

      <ServiceApproach
        content={service.howWeAccomplish}
        features={service.features}
      />

      <ServiceProcess process={service.process} />

      <Contact />
    </div>
  );
}
