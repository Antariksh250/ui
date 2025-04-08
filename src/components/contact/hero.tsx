import Image from "next/image";
import CustomHeading from "../custom-heading/custom-heading";
import { address } from "@/utils/utils.constants";
import ContactForm from "./contact_form";

const title = `Let's Talk About Your Next Big Project`;

export default function ContactBackground() {
  return (
    <section className="w-full h-[1100px] relative mb-[-150px] translate-y-[-150px] xl:mb-[-200px] xl:translate-y-[-200px] overflow-hidden">
      {/* background */}
      <Image
        src="/images/blue-bg.webp"
        alt="Blue background"
        fill
        sizes="100vw"
        className="object-cover"
        priority
      />

      {/* content */}
      <div className="absolute top-[150px] lg:top-[145px] xl:top-[180px] left-0 w-full h-full px-4 lg:px-4 xl:px-20">
        <div className="w-full mt-16 lg:mt-40 flex flex-col lg:flex-row items-center justify-center gap-10">
          {/* texts */}
          <div className="w-full lg:w-3/5 flex flex-col items-center justify-center gap-40">
            <div className="w-full text-left">
              <CustomHeading heading={title} textColor="text-white" />
            </div>
            <div className="hidden lg:block w-full border-t-[1px] border-t-slate-300">
              <p className="px-3 py-2 inline-block text-white text-sm mt-10 bg-blue-800 rounded-full">
                Your nearest office
              </p>
              <p className="block text-white mt-10">{address}</p>
            </div>
          </div>

          {/* form */}
          <div className="w-full lg:w-2/5 px-10 py-10 bg-white rounded-xl">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
