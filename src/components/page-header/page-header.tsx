import CustomImage from "../custom-image/custom-image";

export default function PageHeader() {
  return (
    <div className="w-full px-4 lg:px-4 xl:px-20 py-5 lg:py-8 xl:py-9">
      <div className="w-[160px] xl:w-[220px] h-[80px] xl:h-[110px] relative z-30">
        <CustomImage
          src={"/images/logo.webp"}
          alt="logo"
          sizes="(max-width: 1024px) 160px, (min-width: 1025px) 220px"
        />
      </div>
    </div>
  );
}
