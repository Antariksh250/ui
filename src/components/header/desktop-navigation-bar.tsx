// "use client";

// import * as React from "react";
// import Link from "next/link";
// import { ArrowRight } from "lucide-react";
// import { services, digitalMarketing } from "@/utils/utils.arrays";
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
//   navigationMenuTriggerStyle,
// } from "@/components/ui/navigation-menu";

// export default function DesktopNavigationBar() {
//   return (
//     <NavigationMenu>
//       <NavigationMenuList>
//         {/* Home */}
//         <NavigationMenuItem>
//           <Link href="/" legacyBehavior passHref>
//             <NavigationMenuLink className={navigationMenuTriggerStyle()}>
//               Home
//             </NavigationMenuLink>
//           </Link>
//         </NavigationMenuItem>

//         {/* Services */}
//         <NavigationMenuItem>
//           <NavigationMenuTrigger className="py-0 h-9 rounded-md">
//             Services
//           </NavigationMenuTrigger>
//           <NavigationMenuContent>
//             <div className="w-[483px] p-4">
//               <div className="w-full border-b-[1px] pb-2 pl-3 text-sm border-slate-200">
//                 <p>Services</p>
//               </div>

//               <ul className="w-full mt-4 mb-4 grid gap-3 md:grid-cols-2">
//                 {services.map((service) => (
//                   <li
//                     key={service.title}
//                     className="w-full p-3 hover:bg-slate-100 rounded-md text-[15px]"
//                   >
//                     {service.title}
//                   </li>
//                 ))}
//               </ul>

//               <div className="w-full p-4 bg-slate-100 flex items-center justify-end rounded-md">
//                 <Link
//                   href="/services"
//                   className="px-4 py-3 flex items-center justify-center gap-2 border-[1px] border-blue-600 rounded-md"
//                 >
//                   View all services <ArrowRight />
//                 </Link>
//               </div>
//             </div>
//           </NavigationMenuContent>
//         </NavigationMenuItem>

//         {/* Digital Marketing */}
//         <NavigationMenuItem>
//           <NavigationMenuTrigger className="py-0 h-9 rounded-md">
//             Digital Marketing
//           </NavigationMenuTrigger>
//           <NavigationMenuContent>
//             <div className="w-[483px] p-4">
//               <div className="w-full border-b-[1px] pb-2 pl-3 text-sm border-slate-200">
//                 <p>Digital Marketing</p>
//               </div>

//               <ul className="w-full mt-4 mb-4 grid gap-3 md:grid-cols-2">
//                 {digitalMarketing.map((component) => (
//                   <li
//                     key={component.title}
//                     className="w-full p-3 hover:bg-slate-100 rounded-md text-[15px]"
//                   >
//                     {component.title}
//                   </li>
//                 ))}
//               </ul>

//               <div className="w-full p-4 bg-slate-100 flex items-center justify-end rounded-md">
//                 <Link
//                   href="/services"
//                   className="px-4 py-3 flex items-center justify-center gap-2 border-[1px] border-blue-600 rounded-md"
//                 >
//                   View all products <ArrowRight />
//                 </Link>
//               </div>
//             </div>
//           </NavigationMenuContent>
//         </NavigationMenuItem>

//         {/* About */}
//         <NavigationMenuItem>
//           <Link href="/about" legacyBehavior passHref>
//             <NavigationMenuLink className={navigationMenuTriggerStyle()}>
//               About
//             </NavigationMenuLink>
//           </Link>
//         </NavigationMenuItem>

//         {/* Contact */}
//         <NavigationMenuItem>
//           <Link href="/contact" legacyBehavior passHref>
//             <NavigationMenuLink className={navigationMenuTriggerStyle()}>
//               Contact
//             </NavigationMenuLink>
//           </Link>
//         </NavigationMenuItem>
//       </NavigationMenuList>
//     </NavigationMenu>
//   );
// }

"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services, digitalMarketing } from "@/utils/utils.arrays";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function DesktopNavigationBar() {
  const pathname = usePathname();

  // Function to check if the current path matches the nav item
  const isActive = (path: string): boolean => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname?.startsWith(path) || false;
  };

  // Custom styling function for navigation items
  interface ActiveStylesProps {
    path: string;
  }

  const getActiveStyles = (path: ActiveStylesProps["path"]): string => {
    const baseStyles: string = navigationMenuTriggerStyle();
    const activeStyles: string = isActive(path)
      ? "bg-blue-100 text-blue-700 font-medium"
      : "";
    return `${baseStyles} ${activeStyles}`;
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* Home */}
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={getActiveStyles("/")}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        {/* Services */}
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={`py-0 h-9 rounded-md ${
              isActive("/services")
                ? "bg-blue-100 text-blue-700 font-medium"
                : ""
            }`}
          >
            Services
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[483px] p-4">
              <div className="w-full border-b-[1px] pb-2 pl-3 text-sm border-slate-200">
                <p>Services</p>
              </div>

              <ul className="w-full mt-4 mb-4 grid gap-3 md:grid-cols-2">
                {services.map((service) => (
                  <li
                    key={service.title}
                    className={`w-full p-3 hover:bg-slate-100 rounded-md text-[15px] ${
                      isActive(service.href)
                        ? "bg-blue-100 text-blue-700 font-medium"
                        : ""
                    }`}
                  >
                    <Link
                      href={service.href || "#"}
                      className="block w-full h-full"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="w-full p-4 bg-slate-100 flex items-center justify-end rounded-md">
                <Link
                  href="/services"
                  className="px-4 py-3 flex items-center justify-center gap-2 border-[1px] border-blue-600 rounded-md"
                >
                  View all services <ArrowRight />
                </Link>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Digital Marketing */}
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={`py-0 h-9 rounded-md ${
              isActive("/digital-marketing")
                ? "bg-blue-100 text-blue-700 font-medium"
                : ""
            }`}
          >
            Digital Marketing
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[483px] p-4">
              <div className="w-full border-b-[1px] pb-2 pl-3 text-sm border-slate-200">
                <p>Digital Marketing</p>
              </div>

              <ul className="w-full mt-4 mb-4 grid gap-3 md:grid-cols-2">
                {digitalMarketing.map((component) => (
                  <li
                    key={component.title}
                    className={`w-full p-3 hover:bg-slate-100 rounded-md text-[15px] ${
                      isActive(component.href)
                        ? "bg-blue-100 text-blue-700 font-medium"
                        : ""
                    }`}
                  >
                    <Link
                      href={component.href || "#"}
                      className="block w-full h-full"
                    >
                      {component.title}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="w-full p-4 bg-slate-100 flex items-center justify-end rounded-md">
                <Link
                  href="/digital-marketing"
                  className="px-4 py-3 flex items-center justify-center gap-2 border-[1px] border-blue-600 rounded-md"
                >
                  View all products <ArrowRight />
                </Link>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* About */}
        <NavigationMenuItem>
          <Link href="/about" legacyBehavior passHref>
            <NavigationMenuLink className={getActiveStyles("/about")}>
              About
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        {/* Contact */}
        <NavigationMenuItem>
          <Link href="/contact" legacyBehavior passHref>
            <NavigationMenuLink className={getActiveStyles("/contact")}>
              Contact
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
