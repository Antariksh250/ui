import { MetadataRoute } from "next";
import { getAllServices } from "@/data/services";
import { getAllMarketingServices } from "@/data/digital-marketing";

/**
 * Generates the sitemap for the Antariksh website
 * This helps search engines better understand the structure of the site
 * @returns Sitemap configuration for Next.js
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://antarikshinfotech.com";
  const lastModified = new Date();

  // Main pages
  const mainRoutes = [
    {
      url: `${baseUrl}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/digital-marketing`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
  ];

  // Get all services from the data
  const services = getAllServices();

  // Service detail pages - dynamically generated from services data
  const serviceRoutes = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Get all marketing services from the data
  const marketingServices = getAllMarketingServices();

  // Digital marketing pages - dynamically generated from marketing services data
  const digitalMarketingRoutes = marketingServices.map((service) => ({
    url: `${baseUrl}/digital-marketing/${service.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Combine all routes
  return [...mainRoutes, ...serviceRoutes, ...digitalMarketingRoutes];
}
