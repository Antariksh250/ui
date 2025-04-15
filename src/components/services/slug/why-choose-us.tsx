import CustomHeading from "@/components/custom-heading/custom-heading";
import { Separator } from "@/components/ui/separator";

type ServiceWhyChooseUsPropType = {
  content: string;
};

export default function ServiceWhyChooseUs({
  content,
}: ServiceWhyChooseUsPropType) {
  return (
    <>
      <section className="w-full py-16 md:py-24 mt-[20px] lg:mt-3 xl:mt-28 xl:mb-20 flex flex-col items-start justify-center gap-10 xl:gap-16">
        <div className="lg:col-span-4">
          <CustomHeading heading="Why Choose Us" />
        </div>
        <div className="lg:col-span-8">
          <p className="xl:text-lg text-[rgb(57,60,69)]">{content}</p>
        </div>
      </section>

      <Separator className="my-8" />
    </>
  );
}
