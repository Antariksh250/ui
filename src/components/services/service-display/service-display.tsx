import Card from "./card";
import { servicePageCardArray } from "@/utils/utils.arrays";

export default function ServiceDisplay() {
  return (
    <section className="w-full">
      <div className="mt-12 xl:mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {servicePageCardArray.map((service) => (
          <Card
            key={service.id}
            id={service.id}
            src={service.src}
            title={service.title}
            description={service.description}
            linkHref={service.linkHref}
          />
        ))}
      </div>
    </section>
  );
}
