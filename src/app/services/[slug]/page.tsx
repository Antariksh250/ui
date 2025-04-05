import { notFound } from "next/navigation";
import Image from "next/image";
import { getServiceBySlug, getAllServices } from "@/data/services";

// Generate static paths for all services
export function generateStaticParams() {
  const services = getAllServices();

  // Return an array of objects where each object has a slug property
  // The value must be a string, not an array
  return services.map((service) => ({
    slug: service.slug, // This matches the [slug] in the filename
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: `${service.title} | Our Services`,
    description: service.shortDescription,
  };
}

export default async function ServicePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="service-detail-page">
      {/* Hero Banner */}
      <div className="relative h-72 md:h-96">
        <Image
          src={service.bannerImage}
          alt={service.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {service.title}
            </h1>
            <p className="text-white text-lg md:text-xl max-w-3xl mx-auto">
              {service.shortDescription}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Service Overview */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Overview</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            {service.fullDescription}
          </p>

          {/* Features */}
          <div className="bg-gray-50 p-8 rounded-lg">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">
              Key Features
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.features.map((feature, index) => (
                <li key={index} className="flex items-start mb-4">
                  <div className="mr-4 mt-1 text-blue-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Why Choose Us
          </h2>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <p className="text-lg text-gray-700 leading-relaxed">
                {service.whyChooseUs}
              </p>
            </div>
            <div className="md:w-1/2">
              <Image
                src={service.thumbnailImage}
                alt={`${service.title} thumbnail`}
                width={500}
                height={350}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* How We Accomplish This */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Our Approach
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            {service.howWeAccomplish}
          </p>

          {/* Process Steps */}
          <div className="mt-10">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">
              Our Process
            </h3>
            <div className="space-y-6">
              {service.process.map((step) => (
                <div key={step.step} className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                      {step.step}
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-xl font-medium text-gray-900">
                      {step.title}
                    </h4>
                    <p className="mt-2 text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-blue-600 text-white p-8 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Contact us today to discuss how our {service.title} services can
            help your business grow.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
          >
            Get a Free Consultation
          </a>
        </section>
      </div>
    </div>
  );
}
