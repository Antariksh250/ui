import Image from "next/image";
import CustomHeading from "@/components/custom-heading/custom-heading";

const title = "Our Partners";
const subtitle =
  "Here at Antariksh, we surround ourselves with the best, collaborating with enterprise brands and technology providers at the top of their industry.";

// Toggle this to switch between placeholders and real images
const USE_REAL_IMAGES = false; // Set to true when you have the actual logo files

// CSS-based logo placeholders
const LogoPlaceholders = {
  Microsoft: () => (
    <div className="flex items-center justify-center w-32 h-12">
      <div className="grid grid-cols-2 gap-0.5 w-6 h-6 mr-2">
        <div className="bg-red-500 w-2.5 h-2.5"></div>
        <div className="bg-green-500 w-2.5 h-2.5"></div>
        <div className="bg-blue-500 w-2.5 h-2.5"></div>
        <div className="bg-yellow-500 w-2.5 h-2.5"></div>
      </div>
      <span className="font-semibold text-gray-800 text-sm">Microsoft</span>
    </div>
  ),

  Dell: () => (
    <div className="flex items-center justify-center w-24 h-12">
      <span className="font-bold text-blue-600 text-xl tracking-wider">
        DELL
      </span>
    </div>
  ),

  HP: () => (
    <div className="flex items-center justify-center w-16 h-12">
      <span className="font-bold text-blue-800 text-2xl lowercase">hp</span>
    </div>
  ),

  Mattermost: () => (
    <div className="flex items-center justify-center w-36 h-12">
      <div className="w-6 h-6 bg-blue-600 rounded-full mr-2 flex items-center justify-center">
        <div className="w-3 h-3 bg-white rounded-full"></div>
      </div>
      <span className="font-semibold text-gray-800 text-sm">Mattermost</span>
    </div>
  ),

  GLPi: () => (
    <div className="flex items-center justify-center w-32 h-12">
      <div className="flex flex-col items-center">
        <span className="font-bold text-green-600 text-lg leading-none">
          GLPi
        </span>
        <span className="font-normal text-gray-600 text-xs tracking-wide">
          NETWORK
        </span>
      </div>
    </div>
  ),

  Redington: () => (
    <div className="flex items-center justify-center w-32 h-12">
      <div className="flex items-center">
        <div className="w-2 h-8 bg-red-600 mr-2"></div>
        <span className="font-bold text-gray-800 text-sm">Redington</span>
      </div>
    </div>
  ),

  AutomationAnywhere: () => (
    <div className="flex items-center justify-center w-40 h-12">
      <div className="flex items-center">
        <div className="relative mr-2">
          <div className="w-6 h-6 bg-orange-500 rounded-full"></div>
          <div className="absolute top-1 left-1 w-4 h-4 bg-orange-600 rounded-full"></div>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-gray-800 text-xs leading-none">
            AUTOMATION
          </span>
          <span className="font-bold text-gray-800 text-xs leading-none">
            ANYWHERE
          </span>
        </div>
      </div>
    </div>
  ),
};

const partners = [
  {
    name: "Microsoft",
    logo: "/images/partners/microsoft.png",
    width: 120,
    height: 40,
    placeholder: LogoPlaceholders.Microsoft,
  },
  {
    name: "Dell",
    logo: "/images/partners/dell.png",
    width: 100,
    height: 40,
    placeholder: LogoPlaceholders.Dell,
  },
  {
    name: "HP",
    logo: "/images/partners/hp.png",
    width: 80,
    height: 40,
    placeholder: LogoPlaceholders.HP,
  },
  {
    name: "Mattermost",
    logo: "/images/partners/mattermost.png",
    width: 140,
    height: 40,
    placeholder: LogoPlaceholders.Mattermost,
  },
  {
    name: "GLPi Network",
    logo: "/images/partners/glpi.png",
    width: 120,
    height: 40,
    placeholder: LogoPlaceholders.GLPi,
  },
  {
    name: "Redington",
    logo: "/images/partners/redington.png",
    width: 130,
    height: 40,
    placeholder: LogoPlaceholders.Redington,
  },
  {
    name: "Automation Anywhere",
    logo: "/images/partners/automation-anywhere.png",
    width: 150,
    height: 40,
    placeholder: LogoPlaceholders.AutomationAnywhere,
  },
];

export default function Partners() {
  return (
    <section className="w-full py-16 md:py-24 mt-[20px] lg:mt-3 xl:mt-28 xl:mb-20 flex flex-col items-center justify-center gap-10 xl:gap-16">
      <div className="w-full flex items-center justify-start">
        <CustomHeading heading={title} />
      </div>

      <div className="w-full flex flex-col items-start justify-center gap-8">
        <p className="text-[rgb(57,60,69)] xl:text-lg max-w-2xl">{subtitle}</p>

        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 items-center justify-items-center mt-8">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="w-full aspect-[4/3] max-w-[240px] flex items-center justify-center p-6 hover:scale-105 transition-transform duration-300 grayscale hover:grayscale-0 opacity-90 hover:opacity-100 bg-white rounded-lg shadow-sm border border-gray-200"
            >
              {USE_REAL_IMAGES ? (
                <Image
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  width={partner.width}
                  height={partner.height}
                  className="object-contain max-w-full max-h-full"
                  priority={index < 5}
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  <partner.placeholder />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
