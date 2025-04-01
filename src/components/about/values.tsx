import CustomHeading from "../custom-heading/custom-heading";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// const title = "A Fusion of Diverse Minds and Shared Vision";
const title = "Our Values";

export default function Values() {
  return (
    <section className="w-full mt-10 xl:mt-40 flex flex-col items-center justify-center gap-10 lg:gap-16">
      <div className="w-full text-left">
        <CustomHeading heading={title} />
      </div>

      {/* Accordion */}
      <div className="w-full">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-[rgb(57,60,69)] text-lg xl:text-2xl">
              Commitment to Excellence
            </AccordionTrigger>
            <AccordionContent>
              <p className="py-8 text-[rgb(57,60,69)] xl:text-lg">
                {
                  "We're united around a common goal of delivering high-quality digital products that help our clients solve real problems and achieve their full potential."
                }
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-[rgb(57,60,69)] text-lg xl:text-2xl">
              Wide-Ranging Expertise
            </AccordionTrigger>
            <AccordionContent>
              <p className="py-8 text-[rgb(57,60,69)] xl:text-lg">
                {
                  "Web, mobile, eCommerce, and everything in between. No matter what the project is, we maintain the tools, resources, and expertise to make it happen."
                }
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-[rgb(57,60,69)] text-lg xl:text-2xl">
              Unique Perspectives
            </AccordionTrigger>
            <AccordionContent>
              <p className="py-8 text-[rgb(57,60,69)] xl:text-lg">
                {
                  "We’re constantly trying to break the mold when taking on new clients, hiring new people, and forming new industry partnerships—seeking unique perspectives to help shape our fast-growing global team."
                }
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-[rgb(57,60,69)] text-lg xl:text-2xl">
              Continuous Learning
            </AccordionTrigger>
            <AccordionContent>
              <p className="py-8 text-[rgb(57,60,69)] xl:text-lg">
                {
                  "We’re constantly talking to experts, evaluating technologies, asking questions, doing research, and attending events, then leveraging that knowledge to deliver better results for our clients."
                }
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className="text-[rgb(57,60,69)] text-lg xl:text-2xl">
              Total Transparency
            </AccordionTrigger>
            <AccordionContent>
              <p className="py-8 text-[rgb(57,60,69)] xl:text-lg">
                {
                  "Acting as an extension of our clients’ team, we maintain consistent, honest communication every step of the way, ensuring satisfaction with every project from start to finish."
                }
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
