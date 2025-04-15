import { cache } from "react";

export type MarketingService = {
  id: number;
  slug: string;
  title: string;
  category: string;
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

const marketingServices: MarketingService[] = [
  {
    id: 0,
    slug: "strategy",
    title: "Digital Marketing Strategy",
    category: "Strategy",
    shortDescription:
      "We deliver data-driven digital marketing strategies that boost brand visibility, engagement, and conversions for businesses.",
    fullDescription:
      "Our comprehensive digital marketing strategy services provide businesses with tailored roadmaps to achieve their online goals. We analyze your business objectives, target audience, and competitive landscape to develop integrated strategies that leverage the most effective channels and tactics for your specific needs. Our strategic approach ensures every marketing activity is aligned with your business goals and delivers measurable results.",
    bannerImage: "/images/d-m-strategy.webp",
    thumbnailImage: "/images/d-m-strategy.webp",
    whyChooseUs:
      "Our strategic planning team brings decades of combined experience across diverse industries and platforms. We don't rely on one-size-fits-all templates—instead, we develop custom strategies based on thorough market research, competitive analysis, and audience insights. With a focus on data-driven decision making and measurable outcomes, we create marketing roadmaps that adapt to changing market conditions while maintaining focus on your core business objectives.",
    howWeAccomplish:
      "We follow a methodical process that begins with comprehensive research and auditing of your current digital presence. Through stakeholder interviews, market analysis, and performance data review, we identify opportunities and challenges. We then develop strategic frameworks that define target audiences, messaging architecture, channel priorities, and tactical roadmaps. Each strategy includes clear KPIs and measurement frameworks to track progress and ROI.",
    features: [
      "Comprehensive digital ecosystem analysis",
      "Competitor benchmarking and gap analysis",
      "Target audience persona development",
      "Channel strategy and prioritization",
      "Budget allocation and ROI forecasting",
    ],
    process: [
      {
        step: 1,
        title: "Discovery & Analysis",
        description:
          "We conduct in-depth research into your business goals, current digital presence, market position, and competitor landscape.",
      },
      {
        step: 2,
        title: "Audience Definition",
        description:
          "We develop detailed customer personas and map their journey from awareness to conversion and retention.",
      },
      {
        step: 3,
        title: "Strategic Framework",
        description:
          "We create a comprehensive marketing framework with channel prioritization, messaging architecture, and tactical approaches.",
      },
      {
        step: 4,
        title: "Implementation Planning",
        description:
          "We develop detailed action plans with timelines, resource requirements, and budget allocations.",
      },
      {
        step: 5,
        title: "Measurement & Optimization",
        description:
          "We establish KPIs, reporting frameworks, and continuous improvement processes to maximize ROI.",
      },
    ],
  },
  {
    id: 1,
    slug: "seo",
    title: "Search Engine Optimization",
    category: "SEO",
    shortDescription:
      "We offer advanced SEO solutions to boost organic traffic and enhance business visibility.",
    fullDescription:
      "Our search engine optimization services help businesses improve their visibility in organic search results, driving targeted traffic to their websites. We combine technical expertise with content strategy and authority building to create comprehensive SEO campaigns that deliver sustainable results. From on-page optimization to technical SEO audits and link building, we provide all the elements needed to improve your search engine rankings.",
    bannerImage: "/images/seo.webp",
    thumbnailImage: "/images/seo.webp",
    whyChooseUs:
      "Our SEO team combines technical expertise with strategic thinking to deliver results that last. We stay current with search engine algorithm updates and industry best practices to ensure our strategies remain effective. Unlike agencies that focus on quick wins with risky tactics, we build sustainable SEO foundations that continue to deliver value over time. With transparent reporting and a focus on business metrics beyond just rankings, we ensure your SEO investment translates to real business growth.",
    howWeAccomplish:
      "We implement a methodical approach to SEO that addresses all key ranking factors. Beginning with comprehensive technical audits, we identify and resolve issues that may impact indexing and crawling. Our content strategy addresses search intent while providing value to users, and our off-page efforts focus on building genuine authority through quality backlinks and brand mentions. We continually monitor performance and adapt our approach based on results and algorithm changes.",
    features: [
      "Comprehensive technical SEO audits",
      "Keyword research and competitive analysis",
      "On-page optimization and content strategy",
      "Link building and authority development",
      "Local SEO optimization",
    ],
    process: [
      {
        step: 1,
        title: "Technical Audit & Baseline",
        description:
          "We analyze your current SEO performance, identify technical issues, and establish baseline metrics.",
      },
      {
        step: 2,
        title: "Keyword Strategy",
        description:
          "We research optimal keywords based on search volume, competition, and conversion potential.",
      },
      {
        step: 3,
        title: "On-Page & Technical Optimization",
        description:
          "We implement site architecture improvements, metadata optimization, and content enhancements.",
      },
      {
        step: 4,
        title: "Content Development",
        description:
          "We create and optimize content that addresses search intent while engaging your target audience.",
      },
      {
        step: 5,
        title: "Authority Building",
        description:
          "We develop quality backlinks and citations to strengthen your domain authority and trust.",
      },
    ],
  },
  {
    id: 2,
    slug: "google-ads",
    title: "Google Ads",
    category: "PPC",
    shortDescription:
      "We provide data-driven Google Ads services to maximize reach, optimize campaigns, and drive high-converting traffic for businesses.",
    fullDescription:
      "Our Google Ads management services help businesses leverage the power of paid search to reach customers actively looking for their products or services. We develop and manage campaigns across Search, Display, Shopping, and YouTube to drive targeted traffic, generate leads, and increase sales. With a focus on conversion optimization and ROAS, we ensure your advertising budget delivers maximum value.",
    bannerImage: "/images/google-ads.webp",
    thumbnailImage: "/images/google-ads.webp",
    whyChooseUs:
      "Our Google Ads specialists bring extensive experience and platform certification to every campaign we manage. We combine technical expertise with strategic thinking to develop campaigns that don't just drive clicks, but deliver qualified leads and sales. With granular tracking and attribution, we provide clear insights into campaign performance and ROI. Our approach emphasizes continuous testing and optimization to improve results over time, ensuring your campaigns remain effective as the market and competition evolve.",
    howWeAccomplish:
      "We follow a data-driven methodology that starts with in-depth account structure planning and keyword research. Through careful audience targeting, compelling ad creation, and strategic bid management, we maximize the effectiveness of your budget. Our landing page optimization ensures that traffic converts into leads or sales, and our continuous testing identifies opportunities to improve performance. With regular reporting and analysis, we provide full transparency into campaign performance and ROI.",
    features: [
      "Strategic campaign structure and planning",
      "Advanced audience targeting and segmentation",
      "A/B testing of ad copy and creative",
      "Conversion tracking and attribution",
      "Regular performance optimization",
    ],
    process: [
      {
        step: 1,
        title: "Research & Strategy",
        description:
          "We analyze your business goals, target audience, and competitors to develop a comprehensive campaign strategy.",
      },
      {
        step: 2,
        title: "Campaign Setup",
        description:
          "We build optimally structured campaigns with strategic keyword targeting, compelling ad copy, and proper tracking.",
      },
      {
        step: 3,
        title: "Landing Page Optimization",
        description:
          "We ensure your landing pages are designed to convert the traffic from your ads efficiently.",
      },
      {
        step: 4,
        title: "Performance Monitoring",
        description:
          "We closely track campaign metrics and make data-driven adjustments to improve performance.",
      },
      {
        step: 5,
        title: "Testing & Scaling",
        description:
          "We conduct systematic tests to identify winning elements and scale successful campaigns to maximize results.",
      },
    ],
  },
  {
    id: 3,
    slug: "social-media",
    title: "Social Media Marketing",
    category: "Social",
    shortDescription:
      "We provide innovative social media marketing solutions to enhance brand presence and drive audience engagement.",
    fullDescription:
      "Our social media marketing services help businesses build and engage with their communities across major social platforms. We develop strategic content plans, manage posting schedules, engage with your audience, and implement advertising campaigns to increase brand awareness, drive website traffic, and generate leads. From content creation to community management and paid promotion, we provide comprehensive social media solutions.",
    bannerImage: "/images/social-media-marketing.webp",
    thumbnailImage: "/images/social-media-marketing.webp",
    whyChooseUs:
      "Our social media team combines creative content development with strategic thinking and data analysis to deliver measurable results. We understand the unique characteristics and audiences of each social platform, allowing us to tailor content and strategies that resonate with your target audience. With experience across B2B and B2C industries, we develop social media approaches that align with your brand voice while driving meaningful engagement and business results.",
    howWeAccomplish:
      "We implement a cohesive social media strategy that begins with audience and platform analysis to determine where and how to reach your ideal customers. Through calendar planning, content creation, and community management, we build a consistent brand presence that engages your audience. Our paid social campaigns amplify reach and drive specific actions, while our analytics provide insights to continuously improve performance and ROI.",
    features: [
      "Strategic platform selection and planning",
      "Content calendar development",
      "Community management and engagement",
      "Paid social media campaign management",
      "Performance analytics and reporting",
    ],
    process: [
      {
        step: 1,
        title: "Social Audit & Strategy",
        description:
          "We analyze your current social presence, audience insights, and competitive landscape to develop a strategic roadmap.",
      },
      {
        step: 2,
        title: "Content Planning",
        description:
          "We create a comprehensive content calendar aligned with your marketing objectives and audience interests.",
      },
      {
        step: 3,
        title: "Content Creation",
        description:
          "We develop engaging content tailored to each platform's unique characteristics and audience expectations.",
      },
      {
        step: 4,
        title: "Community Management",
        description:
          "We manage your social community through responsive engagement, moderation, and relationship building.",
      },
      {
        step: 5,
        title: "Amplification & Analysis",
        description:
          "We implement paid campaigns to extend reach and continually analyze performance to optimize results.",
      },
    ],
  },
  {
    id: 4,
    slug: "email-marketing",
    title: "Email Marketing",
    category: "Email",
    shortDescription:
      "Unlock powerful email marketing strategies to engage audiences, drive conversions, and maximize outreach.",
    fullDescription:
      "Our email marketing services help businesses leverage one of the most effective digital channels for nurturing leads, building customer relationships, and driving sales. We develop strategic email campaigns that deliver relevant content to segmented audiences, from welcome sequences and newsletters to promotional campaigns and automated workflows. With a focus on deliverability, engagement, and conversion, we help you get the most from your email marketing investment.",
    bannerImage: "/images/email-marketing.webp",
    thumbnailImage: "/images/email-marketing.webp",
    whyChooseUs:
      "Our email marketing specialists combine technical expertise with strategic thinking and creative execution to deliver campaigns that stand out in crowded inboxes. We understand the nuances of deliverability, rendering across devices, and compliance requirements that impact email success. With experience across diverse industries and objectives, from e-commerce to B2B lead nurturing, we develop email strategies that engage subscribers and drive measurable business results.",
    howWeAccomplish:
      "We implement a comprehensive approach to email marketing that starts with list building and segmentation to ensure relevant messaging. Through strategic content planning, compelling creative design, and systematic testing, we optimize every element of your email campaigns. Our focus on automation and personalization allows for scalable yet individualized communication, while our analytics provide insights for continuous improvement in engagement and conversion rates.",
    features: [
      "List growth and management strategies",
      "Audience segmentation and targeting",
      "Email template design and development",
      "Automated workflow creation",
      "Performance testing and optimization",
    ],
    process: [
      {
        step: 1,
        title: "Strategy Development",
        description:
          "We define your email marketing objectives, audience segments, and key performance indicators.",
      },
      {
        step: 2,
        title: "List Building & Management",
        description:
          "We establish proper list acquisition methods, segmentation structures, and maintenance protocols.",
      },
      {
        step: 3,
        title: "Creative Development",
        description:
          "We design responsive email templates and develop compelling content that drives engagement.",
      },
      {
        step: 4,
        title: "Campaign Execution",
        description:
          "We implement scheduled campaigns and automated workflows with proper tracking and testing.",
      },
      {
        step: 5,
        title: "Analysis & Optimization",
        description:
          "We analyze campaign performance and implement improvements to increase open rates, click-throughs, and conversions.",
      },
    ],
  },
  {
    id: 5,
    slug: "lead-generation",
    title: "Lead Generation",
    category: "Lead Gen",
    shortDescription:
      "Unlock advanced lead generation strategies designed to acquire qualified prospects and boost your sales pipeline.",
    fullDescription:
      "Our lead generation services help businesses identify, attract, and convert potential customers through integrated digital marketing campaigns. We combine content marketing, paid advertising, email nurturing, and conversion optimization to create lead generation systems that fill your sales pipeline with qualified prospects. From top-of-funnel awareness building to bottom-funnel conversion tactics, we develop comprehensive strategies to drive business growth.",
    bannerImage: "/images/lead-gen.webp",
    thumbnailImage: "/images/lead-gen.webp",
    whyChooseUs:
      "Our lead generation team brings a unique combination of marketing expertise and sales understanding to develop campaigns that don't just drive volume, but deliver qualified prospects that convert to customers. We focus on the entire customer acquisition journey, ensuring consistency from first touch to closed deal. With experience across diverse B2B and B2C industries, we know how to adapt our approach to match your specific customer profiles, sales processes, and business objectives.",
    howWeAccomplish:
      "We implement a systematic approach to lead generation that begins with defining your ideal customer profile and mapping their buying journey. Through strategic channel selection, compelling offer development, and optimized landing pages, we create conversion paths that capture prospects' information. Our lead nurturing campaigns move prospects through the sales funnel, while our analytics and CRM integration provide visibility into the full customer acquisition process.",
    features: [
      "Multi-channel lead acquisition strategies",
      "Lead magnet and offer development",
      "Landing page optimization",
      "Lead scoring and qualification",
      "CRM integration and attribution tracking",
    ],
    process: [
      {
        step: 1,
        title: "Audience & Journey Mapping",
        description:
          "We define your ideal customer profiles and map their decision-making journey to identify key touchpoints.",
      },
      {
        step: 2,
        title: "Offer & Channel Strategy",
        description:
          "We develop compelling offers and identify the most effective channels to reach your target audience.",
      },
      {
        step: 3,
        title: "Conversion Path Creation",
        description:
          "We build optimized landing pages and lead capture mechanisms designed for maximum conversion.",
      },
      {
        step: 4,
        title: "Campaign Execution",
        description:
          "We implement integrated campaigns across selected channels to drive prospects to your conversion paths.",
      },
      {
        step: 5,
        title: "Nurturing & Optimization",
        description:
          "We develop lead nurturing sequences and continuously optimize campaigns to improve quality and conversion rates.",
      },
    ],
  },
  {
    id: 6,
    slug: "ppc",
    title: "Pay Per Click Marketing (PPC)",
    category: "PPC",
    shortDescription:
      "Unlock the power of Pay Per Click Marketing with cutting-edge strategies designed to maximize reach, drive targeted traffic, and boost conversions.",
    fullDescription:
      "Our Pay Per Click (PPC) marketing services help businesses leverage paid digital advertising to reach target audiences and drive specific actions. We develop and manage campaigns across search engines, social media platforms, and display networks to generate leads, drive sales, and build brand awareness. With a focus on targeting precision, compelling creative, and continuous optimization, we ensure your advertising budget delivers maximum return on investment.",
    bannerImage: "/images/ppc.webp",
    thumbnailImage: "/images/ppc.webp",
    whyChooseUs:
      "Our PPC specialists bring platform-specific expertise across Google Ads, Facebook, LinkedIn, and other major advertising networks. We combine technical knowledge with strategic thinking to develop campaigns that align with your business objectives and target audience behavior. With granular tracking and multi-touch attribution, we provide clear visibility into campaign performance and ROI. Our testing-focused approach ensures continuous improvement in efficiency and effectiveness as campaigns mature.",
    howWeAccomplish:
      "We follow a data-driven methodology that begins with in-depth audience research and competitive analysis to inform targeting and messaging strategies. Through strategic campaign structure, compelling creative development, and advanced bidding strategies, we maximize both reach and conversion efficiency. Our landing page optimization ensures that clicks convert to leads or sales, while our continuous testing and optimization process drives ongoing improvement in campaign performance.",
    features: [
      "Multi-platform campaign management",
      "Advanced audience targeting and segmentation",
      "A/B testing of ad creative and messaging",
      "Conversion tracking and attribution",
      "Regular performance optimization",
    ],
    process: [
      {
        step: 1,
        title: "Research & Strategy",
        description:
          "We analyze your business objectives, target audience, and competitive landscape to develop a comprehensive campaign strategy.",
      },
      {
        step: 2,
        title: "Campaign Structure & Setup",
        description:
          "We build optimally structured campaigns with strategic targeting, compelling creative, and proper tracking.",
      },
      {
        step: 3,
        title: "Landing Page Optimization",
        description:
          "We ensure your landing pages are designed to convert the traffic from your ads efficiently.",
      },
      {
        step: 4,
        title: "Performance Monitoring",
        description:
          "We closely track campaign metrics and make data-driven adjustments to improve performance.",
      },
      {
        step: 5,
        title: "Testing & Scaling",
        description:
          "We conduct systematic tests to identify winning elements and scale successful campaigns to maximize results.",
      },
    ],
  },
  {
    id: 7,
    slug: "content-marketing",
    title: "Content Marketing",
    category: "Content",
    shortDescription:
      "Our expert-driven content marketing strategies elevate brand awareness, drive engagement, and fuel long-term growth.",
    fullDescription:
      "Our content marketing services help businesses attract, engage, and convert their target audience through valuable and relevant content. We develop comprehensive content strategies and produce high-quality content across formats—from blog posts and whitepapers to videos and infographics—that address your audience's needs at every stage of the buyer's journey. By positioning your brand as a trusted authority, we help you build lasting relationships with prospects and customers.",
    bannerImage: "/images/content-market.webp",
    thumbnailImage: "/images/content-market.webp",
    whyChooseUs:
      "Our content team combines subject matter expertise with storytelling ability and SEO knowledge to create content that resonates with audiences and performs well in search. We take a strategic approach that aligns content creation with business objectives and audience needs rather than simply producing content for its own sake. With experience across diverse industries and content formats, we know how to adapt our approach to reach and engage your specific target audience.",
    howWeAccomplish:
      "We implement a systematic content marketing process that begins with research and strategy development to identify topics and formats that will resonate with your audience. Through editorial planning, quality content creation, and strategic distribution, we ensure your content reaches and engages the right people. Our performance measurement goes beyond basic metrics to assess how content contributes to business goals, providing insights to continuously refine your content strategy.",
    features: [
      "Comprehensive content strategy development",
      "SEO-driven topic research and planning",
      "Multi-format content creation",
      "Content distribution and promotion",
      "Performance analysis and optimization",
    ],
    process: [
      {
        step: 1,
        title: "Content Audit & Strategy",
        description:
          "We analyze your existing content, audience needs, and competitive landscape to develop a strategic roadmap.",
      },
      {
        step: 2,
        title: "Editorial Planning",
        description:
          "We create a comprehensive content calendar aligned with your marketing objectives and audience interests.",
      },
      {
        step: 3,
        title: "Content Creation",
        description:
          "We produce high-quality content that addresses your audience's needs while supporting your business goals.",
      },
      {
        step: 4,
        title: "Distribution & Promotion",
        description:
          "We implement strategies to ensure your content reaches your target audience through optimal channels.",
      },
      {
        step: 5,
        title: "Analysis & Refinement",
        description:
          "We measure content performance against key metrics and continuously refine your strategy for better results.",
      },
    ],
  },
  {
    id: 8,
    slug: "conversion-rate-optimization",
    title: "Conversion Rate Optimization",
    category: "CRO",
    shortDescription:
      "Leveraging advanced CRO strategies to maximize conversions, enhance user engagement, and drive business growth.",
    fullDescription:
      "Our Conversion Rate Optimization (CRO) services help businesses improve the percentage of website visitors who take desired actions, from signing up for newsletters to making purchases. We use data analysis, user research, and systematic testing to identify and remove conversion barriers while enhancing elements that drive action. By optimizing your existing traffic rather than simply acquiring more visitors, CRO provides one of the highest ROIs in digital marketing.",
    bannerImage: "/images/conversion.webp",
    thumbnailImage: "/images/conversion.webp",
    whyChooseUs:
      "Our CRO team combines analytical expertise with UX knowledge and behavioral psychology to develop optimization strategies that deliver measurable results. We take a data-driven approach that goes beyond best practices to identify your specific conversion challenges and opportunities. With experience optimizing websites across industries and business models, from e-commerce to lead generation, we know how to adapt our methods to your unique conversion goals and customer journey.",
    howWeAccomplish:
      "We implement a systematic optimization process that begins with comprehensive data gathering and analysis to identify conversion barriers and opportunities. Through user research, heuristic analysis, and technical assessment, we develop hypotheses for improvement. Our A/B testing methodology allows us to validate changes before full implementation, ensuring that optimizations are based on real user behavior rather than assumptions. With continuous testing and refinement, we drive ongoing improvement in conversion rates.",
    features: [
      "Comprehensive conversion analysis",
      "User behavior research and mapping",
      "A/B and multivariate testing",
      "Landing page optimization",
      "Checkout and form optimization",
    ],
    process: [
      {
        step: 1,
        title: "Research & Analysis",
        description:
          "We analyze your website data, user behavior, and conversion funnels to identify improvement opportunities.",
      },
      {
        step: 2,
        title: "Hypothesis Development",
        description:
          "We formulate evidence-based hypotheses about changes that will improve conversion rates.",
      },
      {
        step: 3,
        title: "Test Planning & Design",
        description:
          "We develop optimized page variations and establish proper testing methodology.",
      },
      {
        step: 4,
        title: "Test Implementation",
        description:
          "We execute A/B or multivariate tests, ensuring statistical validity and proper tracking.",
      },
      {
        step: 5,
        title: "Analysis & Iteration",
        description:
          "We analyze test results, implement winning variations, and develop new hypotheses for continuous improvement.",
      },
    ],
  },
  {
    id: 9,
    slug: "branding",
    title: "Branding Services",
    category: "Branding",
    shortDescription:
      "Our branding services craft compelling identities that captivate audiences and elevate brand recognition.",
    fullDescription:
      "Our branding services help businesses develop and strengthen their unique identity in the marketplace. We create cohesive brand systems that communicate your values, differentiate you from competitors, and connect emotionally with your target audience. From brand strategy and naming to visual identity and messaging guidelines, we provide the foundational elements needed to build a strong, recognizable brand that supports your business objectives.",
    bannerImage: "/images/branding.webp",
    thumbnailImage: "/images/branding.webp",
    whyChooseUs:
      "Our branding team combines strategic thinking with creative execution to develop brands that don't just look good but serve a business purpose. We take a research-based approach that roots brand development in audience insights and market positioning rather than subjective preferences. With experience working across diverse industries and company stages, from startups to rebrands of established companies, we adapt our process to deliver brands that support your specific business goals.",
    howWeAccomplish:
      "We implement a comprehensive branding process that begins with research and strategy development to define your brand positioning and architecture. Through collaborative creative exploration and refinement, we develop visual and verbal identity systems that authentically represent your brand. Our implementation planning and brand guidelines ensure consistency across all touchpoints, while our launch strategies help introduce or refresh your brand in the marketplace.",
    features: [
      "Brand strategy and positioning",
      "Visual identity development",
      "Messaging and verbal identity",
      "Brand guidelines and asset creation",
      "Brand implementation planning",
    ],
    process: [
      {
        step: 1,
        title: "Research & Discovery",
        description:
          "We analyze your business, audience, competitors, and industry trends to inform brand development.",
      },
      {
        step: 2,
        title: "Strategy Development",
        description:
          "We define your brand positioning, architecture, attributes, and core messaging frameworks.",
      },
      {
        step: 3,
        title: "Creative Exploration",
        description:
          "We develop visual identity concepts and verbal elements that express your brand strategy.",
      },
      {
        step: 4,
        title: "Refinement & Finalization",
        description:
          "We refine selected directions and develop comprehensive brand identity systems.",
      },
      {
        step: 5,
        title: "Guidelines & Implementation",
        description:
          "We create brand guidelines and assist with implementing your brand across key touchpoints.",
      },
    ],
  },
];

// Helper functions to work with marketing services
export const getAllMarketingServices = cache(() => {
  return marketingServices;
});

export const getMarketingServiceBySlug = cache(
  (slug: string): MarketingService | undefined => {
    return marketingServices.find((service) => service.slug === slug);
  }
);

export default marketingServices;
