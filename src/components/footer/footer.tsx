import Link from "next/link";
import { navItems, services, digitalMarketing } from "@/utils/utils.arrays";
import { Mail } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { email } from "@/utils/utils.constants";

export default function Footer() {
  return (
    <footer className="w-full px-4 lg:px-4 xl:px-20">
      <div className="w-full border-t-[1px] border-t-slate-300">
        {/* For mobile screen */}
        <div className="block lg:hidden w-full">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-[rgb(57,60,69)]">
                Services
              </AccordionTrigger>
              <AccordionContent>
                <ul className="flex flex-col items-start justify-center gap-3">
                  {services.map((service, index) => {
                    return (
                      <li key={index}>
                        <Link
                          href={service.href}
                          className="text-[rgb(57,60,69)] font-medium"
                        >
                          {service.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-[rgb(57,60,69)]">
                Digital Marketing
              </AccordionTrigger>
              <AccordionContent>
                <ul className="flex flex-col items-start justify-center gap-3">
                  {digitalMarketing.map((service, index) => {
                    return (
                      <li key={index}>
                        <Link
                          href={service.href}
                          className="text-[rgb(57,60,69)] font-medium"
                        >
                          {service.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-[rgb(57,60,69)]">
                Contact
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-[rgb(57,60,69)] font-medium">
                  <Mail size={16} style={{ display: "inline-block" }} /> {email}
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* For dekstop screen */}
        <div className="hidden lg:block w-full py-16">
          <div className="w-full flex items-start justify-start">
            <Link href={"/"} className="text-[rgb(57,60,69)] text-3xl">
              Antariksh
            </Link>

            {/* Navigation */}
            <div className="ml-9 xl:ml-30">
              <ul className="flex flex-col items-start justify-center gap-3">
                {navItems.map((navItem, index) => {
                  return (
                    <li key={index}>
                      <Link
                        href={navItem.href}
                        className="px-3 py-2 text-[rgb(57,60,69)] font-medium rounded-full hover:bg-slate-100"
                      >
                        {navItem.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Digital Marketing */}
            <div className="ml-9 xl:ml-30">
              <ul className="flex flex-col items-start justify-center gap-3">
                {digitalMarketing.map((service, index) => {
                  return (
                    <li key={index}>
                      <Link
                        href={service.href}
                        className="px-3 py-2 text-[rgb(57,60,69)] font-medium rounded-full hover:bg-slate-100"
                      >
                        {service.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Services */}
            <div className="ml-9 xl:ml-30">
              <ul className="flex flex-col items-start justify-center gap-3">
                {services.map((service, index) => {
                  return (
                    <li key={index}>
                      <Link
                        href={service.href}
                        className="px-3 py-2 text-[rgb(57,60,69)] font-medium rounded-full hover:bg-slate-100"
                      >
                        {service.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Socials */}
            {/* <div className="ml-9 xl:ml-30">
              <ul className="flex flex-col items-start justify-center gap-3">
                <li className="text-[rgb(57,60,69)] font-medium">
                  <Mail size={16} style={{ display: "inline-block" }} />{" "}
                  antariksh250@gmail.com
                </li>
              </ul>
            </div> */}
          </div>
        </div>

        {/* Separator */}
        <div className="w-full h-[1px] bg-slate-300"></div>

        <div className="w-full py-8 flex flex-col lg:flex-row-reverse items-center justify-center lg:justify-between gap-5 lg:gap-0">
          <p className="text-[rgb(57,60,69)] text-sm">Privacy Policy</p>
          <p className="text-[rgb(57,60,69)] text-sm">
            © 2025 Antariksh. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
