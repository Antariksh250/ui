import Image from "next/image";

type MarketingBannerPropType = {
  image: string;
  alt: string;
};

export default function MarketingBanner({
  image,
  alt,
}: MarketingBannerPropType) {
  return (
    <section className="w-full my-16">
      <div className="relative w-full aspect-[16/9]">
        <Image
          src={image}
          alt={alt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
          className="object-cover rounded-md"
        />
      </div>
    </section>
  );
}
