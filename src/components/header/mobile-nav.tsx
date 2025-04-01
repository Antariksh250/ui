import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, ChevronDown, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { services, digitalMarketing } from "@/utils/utils.arrays";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

// Reusable NavLink component
interface NavLinkProps {
  children?: React.ReactNode;
  href: string;
  className?: string;
  title: string;
  isBlue?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({
  children,
  href,
  className,
  title,
  isBlue = false,
}) => {
  const defaultClass = "block py-2 px-4";
  const colorClass = isBlue ? "text-blue-600 font-medium" : "text-gray-700";

  const combinedClass = className
    ? `${className} ${colorClass}`
    : `${defaultClass} ${colorClass}`;

  return (
    <DialogClose asChild>
      <Link href={href} className={combinedClass}>
        {title}
        {children}
      </Link>
    </DialogClose>
  );
};

const MobileNavigation = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [, setIsAnimating] = useState(false);
  const [open, setOpen] = useState(false);

  interface ToggleSectionProps {
    section: string;
  }

  const toggleSection = (section: ToggleSectionProps["section"]): void => {
    setIsAnimating(true);
    if (openSection === section) {
      setOpenSection(null);
    } else {
      setOpenSection(section);
    }
    // Reset animation state after transition completes
    setTimeout(() => setIsAnimating(false), 300);
  };

  // Add some entrance animation for the dialog
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (open) {
      setShowContent(true);
    } else {
      setShowContent(false);
    }
  }, [open]);

  // Handle routing changes to close the dialog when navigating
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="p-2">
          <Menu size={24} />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[90%] h-[90vh] flex flex-col lg:hidden transition-all duration-500"
        style={{
          opacity: showContent ? 1 : 0,
          transform: showContent ? "scale(1)" : "scale(0.95)",
        }}
        aria-describedby="navigation-dialog"
      >
        <DialogHeader className="flex justify-end items-center pb-2 flex-shrink-0">
          <div className="hidden">
            <DialogTitle></DialogTitle>
          </div>
        </DialogHeader>

        {/* Home */}
        <div className="flex-1 overflow-y-auto py-4 flex flex-col">
          <NavLink
            href="/"
            className="py-3 px-4 text-gray-800 font-medium"
            title="Home"
          />

          {/* Services */}
          <div>
            <button
              onClick={() => toggleSection("services")}
              className="w-full flex justify-between items-center py-3 px-4 text-gray-800 font-medium"
            >
              Services
              {openSection === "services" ? (
                <ChevronDown size={18} />
              ) : (
                <ChevronRight size={18} />
              )}
            </button>

            <div className="overflow-hidden transition-all duration-300 ease-in-out">
              <div
                className={`py-2 px-2 transition-all duration-300 ${
                  openSection === "services"
                    ? "max-h-[500px] opacity-100"
                    : "max-h-0 opacity-0 overflow-hidden"
                }`}
              >
                {services.map((service, index) => {
                  return (
                    <NavLink
                      key={index}
                      href={service.href}
                      title={service.title}
                    />
                  );
                })}
                <NavLink
                  href="/services"
                  isBlue={true}
                  className="flex items-center py-2 px-4"
                  title="View all services"
                >
                  <ArrowRight size={16} className="ml-1 mt-1" />
                </NavLink>
              </div>
            </div>
          </div>

          {/* Digital Marketing */}
          <div>
            <button
              onClick={() => toggleSection("digital-marketing")}
              className="w-full flex justify-between items-center py-3 px-4 text-gray-800 font-medium"
            >
              Digital Marketing
              {openSection === "digital-marketing" ? (
                <ChevronDown size={18} />
              ) : (
                <ChevronRight size={18} />
              )}
            </button>

            <div className="overflow-hidden transition-all duration-300 ease-in-out">
              <div
                className={`py-2 px-2 transition-all duration-300 ${
                  openSection === "digital-marketing"
                    ? "max-h-[500px] opacity-100"
                    : "max-h-0 opacity-0 overflow-hidden"
                }`}
              >
                {digitalMarketing.map((service, index) => {
                  return (
                    <NavLink
                      key={index}
                      href={service.href}
                      title={service.title}
                    />
                  );
                })}
                <NavLink
                  href="/digital-marketing"
                  isBlue={true}
                  className="flex items-center py-2 px-4"
                  title="View all products"
                >
                  <ArrowRight size={16} className="ml-1 mt-1" />
                </NavLink>
              </div>
            </div>
          </div>

          {/* About */}
          <NavLink
            href="/about"
            className="py-3 px-4 text-gray-800 font-medium"
            title="About"
          />

          {/* Contact */}
          <NavLink
            href="/contact"
            className="py-3 px-4 text-gray-800 font-medium"
            title="Contact"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MobileNavigation;
