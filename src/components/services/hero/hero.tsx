type HeroPropType = {
  title: string;
  subtitle: string;
};

export default function Hero({ title, subtitle }: HeroPropType) {
  return (
    <section className="w-full">
      <div className="w-full">
        <div className="mt-4 xl:mt-26">
          <h1 className="text-3xl lg:text-5xl xl:text-6xl text-[rgb(57,60,69)] font-medium">
            {title}
          </h1>
        </div>

        <div className="mt-10 xl:mt-16 grid w-full auto-rows-min grid-cols-6 gap-4 lg:grid-cols-12 lg:gap-x-8">
          <p className="xl:text-lg text-[rgb(57,60,69)] col-span-full lg:col-start-1 lg:col-end-7">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
