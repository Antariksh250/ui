export type Service = {
  id: number;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  bannerImage: string;
  thumbnailImage: string;
  whyChooseUs: string;
  howWeAccomplish: string;
  features: string[];
  process: Array<{
    step: number;
    title: string;
    description: string;
  }>;
};

const services: Service[] = [
  {
    id: 0,
    slug: "website-design",
    title: "Website Design",
    shortDescription:
      "We create stunning, user-centric website designs that elevate brand presence and drive engagement.",
    fullDescription:
      "Our website design services combine artistic creativity with technical expertise to craft visually appealing, highly functional websites that not only look stunning but also deliver exceptional user experiences. Each design is tailored to reflect your brand identity while ensuring optimal performance, accessibility, and conversion optimization.",
    bannerImage: "/images/banners/website-design-banner.webp",
    thumbnailImage: "/images/web-design.webp",
    whyChooseUs:
      "Our design team brings together years of industry experience and a deep understanding of current design trends, user behavior, and conversion principles. We don't just create beautiful websites; we build strategic digital assets that work hard for your business. With meticulous attention to detail, responsive layouts, and a focus on performance, we deliver designs that stand out in today's competitive digital landscape.",
    howWeAccomplish:
      "We follow a comprehensive design process that begins with understanding your brand, target audience, and business objectives. Through collaborative wireframing, prototyping, and iterative design, we craft websites that align perfectly with your vision while incorporating best practices in user experience.",
    features: [
      "Custom responsive designs",
      "User experience (UX) focused layouts",
      "Brand-aligned visual elements",
      "Conversion-optimized page structures",
      "Accessibility compliance",
    ],
    process: [
      {
        step: 1,
        title: "Discovery & Strategy",
        description:
          "We analyze your business needs, target audience, and competition to establish a solid design direction.",
      },
      {
        step: 2,
        title: "Wireframing & Prototyping",
        description:
          "We create structural blueprints and interactive prototypes to visualize the website before full design.",
      },
      {
        step: 3,
        title: "Visual Design",
        description:
          "Our designers craft beautiful, brand-aligned visual elements and page layouts.",
      },
      {
        step: 4,
        title: "Revision & Refinement",
        description:
          "We collaborate with you to perfect every design element through thorough feedback and iterations.",
      },
      {
        step: 5,
        title: "Finalization & Handoff",
        description:
          "Designs are prepared for development with comprehensive specifications and assets.",
      },
    ],
  },
  {
    id: 1,
    slug: "app-development",
    title: "App Development",
    shortDescription:
      "We provide cutting-edge app development solutions to create seamless, high-performance, and user-friendly digital experiences.",
    fullDescription:
      "Our app development team specializes in creating powerful, intuitive applications for mobile and desktop platforms. We blend innovative technology with thoughtful design to build apps that solve real problems for users while achieving your business objectives. From concept to deployment, we handle every aspect of the development process.",
    bannerImage: "/images/banners/app-development-banner.webp",
    thumbnailImage: "/images/app-dev.webp",
    whyChooseUs:
      "With expertise across multiple platforms and technologies, our development team delivers apps that perform flawlessly across devices. We emphasize clean code, scalable architecture, and future-proof solutions that grow with your business. Our collaborative approach keeps you involved throughout development, ensuring the final product perfectly aligns with your vision and requirements.",
    howWeAccomplish:
      "We implement an agile development methodology that prioritizes continuous delivery and improvement. Through regular sprints, testing, and refinement, we maintain transparency while efficiently building robust applications that exceed expectations.",
    features: [
      "Native and cross-platform development",
      "Intuitive user interfaces",
      "Robust backend infrastructure",
      "API integration capabilities",
      "Comprehensive testing protocols",
    ],
    process: [
      {
        step: 1,
        title: "Requirements Analysis",
        description:
          "We gather detailed specifications and user stories to fully understand the app's functionality.",
      },
      {
        step: 2,
        title: "Architecture Planning",
        description:
          "Our engineers design the technical foundation that will support your app's performance needs.",
      },
      {
        step: 3,
        title: "Development Sprints",
        description:
          "We build your app in planned iterations, focusing on core features first.",
      },
      {
        step: 4,
        title: "Quality Assurance",
        description:
          "Rigorous testing ensures your app functions perfectly across all intended devices and scenarios.",
      },
      {
        step: 5,
        title: "Deployment & Optimization",
        description:
          "We launch your app and provide ongoing support to enhance performance and address user feedback.",
      },
    ],
  },
  {
    id: 2,
    slug: "software-testing",
    title: "Software Testing",
    shortDescription:
      "Advanced software testing solutions to ensure quality, reliability, and seamless performance.",
    fullDescription:
      "Our comprehensive software testing services verify the functionality, usability, and security of your applications before they reach your users. We implement rigorous testing methodologies to identify and resolve issues early in the development cycle, reducing costs and improving overall quality.",
    bannerImage: "/images/banners/software-testing-banner.webp",
    thumbnailImage: "/images/soft-testing.webp",
    whyChooseUs:
      "Our testing team combines automated and manual testing approaches to provide thorough coverage for your applications. We understand that quality isn't just about finding bugs—it's about ensuring excellent user experiences. With expertise in performance, security, and usability testing, we help deliver software that builds trust with your users and strengthens your reputation.",
    howWeAccomplish:
      "We create customized testing strategies based on your specific requirements and risk assessment. By implementing both automated and manual testing protocols, we ensure comprehensive coverage while maintaining efficiency throughout the testing lifecycle.",
    features: [
      "Functional and regression testing",
      "Performance and load testing",
      "Security vulnerability assessment",
      "Usability and accessibility testing",
      "Automated test suite development",
    ],
    process: [
      {
        step: 1,
        title: "Test Planning",
        description:
          "We develop comprehensive test plans aligned with your quality objectives and risk factors.",
      },
      {
        step: 2,
        title: "Test Case Development",
        description:
          "Our team creates detailed test scenarios covering all critical functionality and edge cases.",
      },
      {
        step: 3,
        title: "Execution",
        description:
          "We perform thorough testing across environments, devices, and conditions.",
      },
      {
        step: 4,
        title: "Defect Reporting",
        description:
          "Clear, actionable bug reports help developers quickly understand and resolve issues.",
      },
      {
        step: 5,
        title: "Verification & Documentation",
        description:
          "We verify fixes and prepare detailed testing documentation for compliance and future reference.",
      },
    ],
  },
  {
    id: 3,
    slug: "website-redesign-maintenance",
    title: "Website Redesigning & Maintenance",
    shortDescription:
      "We provide expert website redesign and maintenance services to enhance performance, user experience, and long-term functionality.",
    fullDescription:
      "Our website redesign and maintenance services breathe new life into outdated sites while ensuring your digital presence remains current, secure, and effective. We transform underperforming websites into modern, high-converting platforms while providing ongoing support to keep your site running smoothly.",
    bannerImage: "/images/banners/website-maintenance-banner.webp",
    thumbnailImage: "/images/maintainance.webp",
    whyChooseUs:
      "We approach redesigns strategically, preserving what works while enhancing areas that need improvement. Our maintenance services go beyond simple updates—we proactively monitor performance, security, and user experience to address issues before they impact your business. With flexible support packages and dedicated technicians, we ensure your website continues to serve your business objectives effectively.",
    howWeAccomplish:
      "For redesigns, we conduct thorough audits of your existing site to identify opportunities and challenges. Our maintenance services include regular updates, performance optimization, security monitoring, and content management support to keep your site fresh and functional.",
    features: [
      "Strategic redesign planning",
      "Performance optimization",
      "Security patches and updates",
      "Content management",
      "Analytics and reporting",
    ],
    process: [
      {
        step: 1,
        title: "Website Audit",
        description:
          "We analyze your current website's performance, design, and functionality to identify improvement areas.",
      },
      {
        step: 2,
        title: "Strategy Development",
        description:
          "Based on audit findings, we create a detailed roadmap for improvements and ongoing maintenance.",
      },
      {
        step: 3,
        title: "Implementation",
        description:
          "Our team executes redesign elements or establishes maintenance procedures according to the plan.",
      },
      {
        step: 4,
        title: "Quality Control",
        description:
          "We thoroughly test all changes and maintenance updates before they go live.",
      },
      {
        step: 5,
        title: "Ongoing Support",
        description:
          "Regular maintenance, monitoring, and support ensure your website continues to perform optimally.",
      },
    ],
  },
  {
    id: 4,
    slug: "ecommerce-development",
    title: "E-Commerce Development",
    shortDescription:
      "Delivering cutting-edge e-commerce development solutions to drive sales, enhance user experience, and maximize business growth.",
    fullDescription:
      "Our e-commerce development services create powerful online stores that convert visitors into customers. We build customized shopping experiences with seamless checkout processes, product management systems, and integration with payment gateways and shipping solutions to help your business thrive in the digital marketplace.",
    bannerImage: "/images/banners/ecommerce-banner.webp",
    thumbnailImage: "/images/e-com.webp",
    whyChooseUs:
      "Our e-commerce expertise spans multiple platforms and industries, giving us insight into what drives online sales. We focus on creating shopping experiences that balance aesthetic appeal with conversion optimization. With attention to security, performance, and scalability, we build stores that can grow with your business and adapt to changing market demands.",
    howWeAccomplish:
      "We select the right e-commerce platform for your specific needs and customize it to align with your business model. Through careful UX design, performance optimization, and strategic feature implementation, we create online stores that delight customers and drive revenue.",
    features: [
      "Custom storefront design",
      "Product catalog management",
      "Secure payment processing",
      "Inventory synchronization",
      "Mobile shopping optimization",
    ],
    process: [
      {
        step: 1,
        title: "Business Analysis",
        description:
          "We examine your products, target market, and business requirements to identify the optimal e-commerce approach.",
      },
      {
        step: 2,
        title: "Platform Selection",
        description:
          "Based on your needs, we recommend and implement the most suitable e-commerce platform.",
      },
      {
        step: 3,
        title: "Design & Development",
        description:
          "Our team creates a custom storefront and implements all necessary features and integrations.",
      },
      {
        step: 4,
        title: "Testing & Quality Assurance",
        description:
          "We thoroughly test all store functionality, including checkout processes and payment systems.",
      },
      {
        step: 5,
        title: "Launch & Optimization",
        description:
          "After launch, we monitor performance and provide optimization recommendations to improve conversions.",
      },
    ],
  },
  {
    id: 5,
    slug: "document-digitization",
    title: "Digitization of Documents",
    shortDescription:
      "Leverage cutting-edge digitization solutions to transform documents, streamline workflows, and enhance accessibility.",
    fullDescription:
      "Our document digitization services convert physical documents into searchable, editable digital formats. We help organizations reduce paper usage, improve data accessibility, and streamline document management processes through advanced scanning, OCR technology, and document management systems.",
    bannerImage: "/images/banners/document-digitization-banner.webp",
    thumbnailImage: "/images/doc-digitize.webp",
    whyChooseUs:
      "Our digitization team combines technological expertise with meticulous attention to detail to ensure accurate, high-quality conversion of your documents. We implement secure workflows that protect sensitive information throughout the digitization process. With scalable solutions for projects of any size, from small batches to large archives, we help organizations embrace digital transformation while preserving important information.",
    howWeAccomplish:
      "We deploy advanced scanning hardware and OCR software to convert physical documents into searchable digital formats. With careful quality control and metadata tagging, we ensure your digital documents are accurately categorized and easily retrievable within your document management system.",
    features: [
      "High-resolution scanning",
      "OCR text recognition",
      "Metadata tagging and organization",
      "Document restoration capabilities",
      "Secure cloud storage options",
    ],
    process: [
      {
        step: 1,
        title: "Document Assessment",
        description:
          "We evaluate your document types, volume, and specific requirements to plan the digitization process.",
      },
      {
        step: 2,
        title: "Preparation",
        description:
          "Documents are prepared for scanning, including removal of staples and repair of damaged pages.",
      },
      {
        step: 3,
        title: "Scanning & Processing",
        description:
          "Our team scans documents and applies OCR and other processing technologies.",
      },
      {
        step: 4,
        title: "Quality Control",
        description:
          "Each digitized document undergoes inspection to ensure accuracy and readability.",
      },
      {
        step: 5,
        title: "Organization & Delivery",
        description:
          "Final files are organized according to your specifications and delivered in your preferred format.",
      },
    ],
  },
  {
    id: 6,
    slug: "printing-stationery",
    title: "Printing & Supply of Stationeries",
    shortDescription:
      "Delivering high-quality printing and stationery supplies to support efficiency and professionalism in every workspace.",
    fullDescription:
      "Our printing and stationery services provide businesses with premium-quality printed materials and office supplies. From business cards and letterheads to promotional materials and corporate gifts, we deliver professional printing solutions that strengthen your brand identity and support daily operations.",
    bannerImage: "/images/banners/printing-banner.webp",
    thumbnailImage: "/images/printing.webp",
    whyChooseUs:
      "We combine state-of-the-art printing technology with exceptional material quality to produce stationery that makes a lasting impression. Our team understands the importance of consistency in brand representation across all printed materials. With flexible options for both small runs and large-volume orders, we provide cost-effective solutions while maintaining high quality standards.",
    howWeAccomplish:
      "From initial design consultation to final production and delivery, we manage the entire printing process with attention to detail. We offer guidance on paper selection, printing techniques, and finishing options to achieve the perfect result for your specific needs.",
    features: [
      "High-resolution printing",
      "Premium paper and material options",
      "Brand consistency management",
      "Environmentally friendly options",
      "Quick turnaround capabilities",
    ],
    process: [
      {
        step: 1,
        title: "Consultation",
        description:
          "We discuss your printing needs, budget, and timeline to recommend appropriate solutions.",
      },
      {
        step: 2,
        title: "Design & Proofing",
        description:
          "Our team assists with design or works from your files to create digital proofs for approval.",
      },
      {
        step: 3,
        title: "Material Selection",
        description:
          "We help you select the ideal paper, card stock, or materials for your specific items.",
      },
      {
        step: 4,
        title: "Production",
        description:
          "Using advanced printing technology, we produce your items with careful quality control.",
      },
      {
        step: 5,
        title: "Finishing & Delivery",
        description:
          "Items are professionally finished (cut, folded, bound, etc.) and delivered to your location.",
      },
    ],
  },
  {
    id: 7,
    slug: "cloud-call-center",
    title: "Cloud Call Center Solution",
    shortDescription:
      "Cloud call center solutions designed to streamline customer interactions, enhance efficiency, and drive business growth.",
    fullDescription:
      "Our cloud call center solutions provide businesses with flexible, scalable communication platforms to manage customer interactions efficiently. We implement advanced call routing, analytics, and integration capabilities that improve agent productivity, enhance customer experiences, and provide valuable insights into customer engagement.",
    bannerImage: "/images/banners/call-center-banner.webp",
    thumbnailImage: "/images/call-center.webp",
    whyChooseUs:
      "Our cloud-based approach eliminates the need for expensive hardware while providing greater flexibility and reliability. We focus on creating intuitive systems that agents can quickly master, reducing training time and improving service quality. With robust analytics and integration capabilities, our solutions connect seamlessly with your existing systems while providing actionable insights to continuously improve performance.",
    howWeAccomplish:
      "We assess your communication needs and implement customized cloud call center solutions that align with your business objectives. Through careful configuration, integration with existing systems, and comprehensive training, we ensure a smooth transition to a more efficient customer communication platform.",
    features: [
      "Intelligent call routing",
      "Real-time analytics and reporting",
      "CRM integration capabilities",
      "Omnichannel support options",
      "Quality monitoring tools",
    ],
    process: [
      {
        step: 1,
        title: "Requirements Analysis",
        description:
          "We analyze your communication needs, call volumes, and existing systems to determine requirements.",
      },
      {
        step: 2,
        title: "Solution Design",
        description:
          "Our team configures a cloud call center solution tailored to your specific business requirements.",
      },
      {
        step: 3,
        title: "Implementation",
        description:
          "We set up the system, integrate with your existing tools, and configure all necessary features.",
      },
      {
        step: 4,
        title: "Training",
        description:
          "Comprehensive training ensures your team can effectively use all system capabilities.",
      },
      {
        step: 5,
        title: "Ongoing Support",
        description:
          "We provide technical support, performance monitoring, and continuous optimization recommendations.",
      },
    ],
  },
];

// Helper functions to work with services
export const getAllServices = () => services;

export const getServiceBySlug = (slug: string): Service | undefined =>
  services.find((service) => service.slug === slug);

export default services;
